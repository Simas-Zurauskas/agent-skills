"""Focused artifact/recovery tests. All scratch files stay in the isolated lab."""
from concurrent.futures import ThreadPoolExecutor
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
TMP = Path(os.environ.get('MOOD_TEST_TMP', tempfile.gettempdir())) / 'mood-assembly-tests'
TMP.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(ROOT / 'scripts'))
from round_support import atomic_write, relocate_html, viewport_css


class AssemblyTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=TMP)
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.out = self.base / 'out'
        self.config = self.base / 'round.json'
        self.cfg = {'out': str(self.out), 'lab': str(self.base / 'lab'), 'round': 1,
                    'variants': {f'{n:02}': f'Direction {n}' for n in range(1, 7)},
                    'screens': [['1', 'Home', 'compare-home']]}
        self.save()

    def save(self): self.config.write_text(json.dumps(self.cfg))

    def run_script(self, name, *args, success=True, env=None):
        result = subprocess.run([sys.executable, str(ROOT / 'scripts' / name), *map(str, args)], capture_output=True, text=True, env=env)
        if success:
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        return result

    def variant(self, v='01', lab=False):
        if lab:
            directory = Path(self.cfg['lab']) / 'src/explorations'
            (directory / 'parts').mkdir(parents=True, exist_ok=True)
            paths = {'head': directory / f'parts/r1-v{v}-head.html', 'board': directory / f'parts/r1-v{v}-board.html', 'css': directory / f'r1-v{v}.css', 'screen': directory / f'screen-r1-v{v}-1.html'}
            link = f'screen-r1-v{v}-1.html'
        else:
            directory = self.out / f'round-01/v{v}'
            directory.mkdir(parents=True, exist_ok=True)
            paths = {'head': directory / 'head.html', 'board': directory / 'board.html', 'css': directory / 'style.css', 'screen': directory / 'screen-1.html'}
            link = 'screen-1.html'
        paths['head'].write_text('')
        paths['board'].write_text(f'<article class="r1-v{v}">A board</article>')
        paths['css'].write_text(f'.r1-v{v} {{ color: black; }}')
        paths['screen'].write_text(f'<html><head><title>R1 V{v} · Home</title></head><body class="r1-v{v}">Hello Sam<a href="{link}">Home</a>' + ('' if lab else '<script src="../../assets/phone.js"></script>') + '</body></html>')
        return paths

    def test_url_relocation_keeps_original_resource_identity(self):
        source = '''<svg viewBox="0 0 10 10"><use href='#symbol'/></svg><img src='../../img/a.png?q=1&amp;x=2#crop'><img src="local.png"><img src="../shared.png"><img src="data:image/png;base64,abc"><img src="https://cdn.test/a.png"><img src="//cdn.test/b.png">'''
        relocated = relocate_html(source, 'v01/')
        for expected in ('viewBox="0 0 10 10"', 'href="#symbol"', 'src="../img/a.png?q=1&amp;x=2#crop"', 'src="v01/local.png"', 'src="shared.png"', 'src="data:image/png;base64,abc"', 'src="https://cdn.test/a.png"', 'src="//cdn.test/b.png"'):
            self.assertIn(expected, relocated)
        source = '''<img data-note='example src="keep.png"' src="real.png" aria-label="href='keep'">'''
        self.assertEqual(relocate_html(source, 'v01/'), source.replace('src="real.png"', 'src="v01/real.png"'))

    def test_early_round_partial_publish_and_final_refusal_preserve_page(self):
        self.run_script('assemble-standalone.py', self.config, '--draft')
        page = self.out / 'round-01/index.html'
        self.assertEqual(page.read_text().count('data-status="pending"'), 6)
        self.variant()
        self.run_script('assemble-standalone.py', self.config, '--draft')
        published = page.read_bytes()
        self.assertEqual(published.count(b'data-status="pending"'), 5)
        self.assertIn(b'V01 \xc2\xb7 Draft', published)
        self.run_script('assemble-standalone.py', self.config, '--final', success=False)
        self.assertEqual(page.read_bytes(), published)
        self.run_script('check-standalone.py', self.config, '--draft')
        self.run_script('check-standalone.py', self.config, '--final', success=False)

    def test_ready_publication_ignores_active_siblings_and_preserves_strict_final(self):
        for lab in (False, True):
            with self.subTest(lab=lab):
                script = 'design-lab/assemble-round.py' if lab else 'assemble-standalone.py'
                self.variant('01', lab=lab)
                active = self.variant('02', lab=lab)
                active['screen'].write_text('<html>writer has not added a title yet</html>')
                page = Path(self.cfg['lab']) / 'src/explorations/round-01.html' if lab else self.out / 'round-01/index.html'
                self.run_script(script, self.config, '--draft', '--ready', '01')
                published = page.read_bytes()
                self.assertEqual(published.count(b'data-status="pending"'), 5)
                self.assertNotIn(b'iframe src="' + (b'screen-r1-v02-1.html' if lab else b'v02/screen-1.html'), published)
                for ids in ('01,01', '01,99', '01,03'):
                    self.run_script(script, self.config, '--draft', '--ready', ids, success=False)
                    self.assertEqual(page.read_bytes(), published)
                self.run_script(script, self.config, '--final', '--ready', '01', success=False)
                self.assertEqual(page.read_bytes(), published)
                self.run_script(script, self.config, '--draft', '--ready', '')
                self.assertEqual(page.read_bytes().count(b'data-status="pending"'), 6)
                self.variant('02', lab=lab)
                self.run_script(script, self.config, '--draft', '--ready', '01,02')
                self.assertEqual(page.read_bytes().count(b'data-status="pending"'), 4)

    def test_final_content_css_and_review_labels(self):
        self.cfg['variants'] = {'01': 'One'}
        self.cfg['content_specs'] = {'1': ['Hello Sam']}
        self.cfg['review_status'] = {'01': 'reviewed'}
        self.save()
        files = self.variant()
        self.run_script('assemble-standalone.py', self.config, '--final')
        page = self.out / 'round-01/index.html'
        self.assertIn('V01 · Reviewed', page.read_text())
        old = page.read_bytes()
        self.cfg['content_specs']['1'] = ['Missing content']; self.save()
        self.run_script('assemble-standalone.py', self.config, '--final', success=False)
        self.assertEqual(page.read_bytes(), old)

        self.cfg.pop('content_specs'); self.save()
        self.run_script('assemble-standalone.py', self.config, '--final', success=False)
        self.run_script('check-standalone.py', self.config, '--final', success=False)
        self.assertEqual(page.read_bytes(), old)
        files['css'].unlink()
        self.run_script('assemble-standalone.py', self.config, '--final', success=False)
        self.assertEqual(page.read_bytes(), old)

    def test_final_accepts_native_text_input_content_without_duplicated_labels(self):
        self.cfg['variants'] = {'01': 'One'}
        self.cfg['content_specs'] = {'1': ['09 Nov, 16:00', 'Search shipments']}; self.save()
        files = self.variant()
        files['screen'].write_text('<title>R1 V01 · Detail</title><body><input value="09 Nov, 16:00"><input placeholder="Search shipments"></body>')
        self.run_script('assemble-standalone.py', self.config, '--final')
        files['screen'].write_text('<title>R1 V01 · Detail</title><body><input type="hidden" value="09 Nov, 16:00"><input placeholder="Search shipments"></body>')
        self.run_script('assemble-standalone.py', self.config, '--final', success=False)

    def test_concurrent_previews_never_write_shared_assets_or_round(self):
        self.run_script('assemble-standalone.py', self.config, '--draft')
        paths = [self.out / 'round-01/index.html', *sorted((self.out / 'assets').iterdir())]
        before = {str(p): (p.read_bytes(), p.stat().st_mtime_ns) for p in paths}
        for v in ('01', '02', '03'): self.variant(v)
        with ThreadPoolExecutor(max_workers=3) as pool:
            list(pool.map(lambda v: self.run_script('assemble-standalone.py', self.config, '--preview', v), ('01', '02', '03')))
        self.assertEqual(before, {str(p): (p.read_bytes(), p.stat().st_mtime_ns) for p in paths})
        for v in ('01', '02', '03'):
            self.assertIn(f'V{v} · Draft', (self.out / f'round-01/preview-v{v}.html').read_text())
        asset = self.out / 'assets/moodboard.css'; asset.write_text('/* user work */')
        unrelated = self.out / 'round-01/preview-v-user-notes.html'; unrelated.write_text('keep')
        other_round = self.out / 'round-01/preview-v99.html'; other_round.write_text('prior user output')
        self.run_script('assemble-standalone.py', self.config)
        self.assertEqual(asset.read_text(), '/* user work */')
        self.assertEqual(unrelated.read_text(), 'keep')
        self.assertEqual(other_round.read_text(), 'prior user output')

    def test_desktop_viewport_is_round_local_and_validated_before_publication(self):
        self.cfg['viewport'] = {'width': 1366, 'height': 900}; self.save()
        for script in ('assemble-standalone.py', 'design-lab/assemble-round.py'):
            self.run_script(script, self.config, '--draft')
        for page in (self.out / 'round-01/index.html', Path(self.cfg['lab']) / 'src/explorations/round-01.html'):
            self.assertIn('width:1366px; height:900px;', page.read_text())
            self.assertIn('flex-direction:column', page.read_text())
        self.assertEqual(viewport_css({}, 'lab'), '')
        with self.assertRaises(ValueError): viewport_css({'viewport': {'width': -1, 'height': 900}}, 'lab')
        old = (self.out / 'round-01/index.html').read_bytes()
        self.cfg['viewport']['width'] = '1366'; self.save()
        self.run_script('assemble-standalone.py', self.config, '--draft', success=False)
        self.assertEqual((self.out / 'round-01/index.html').read_bytes(), old)

    def test_resume_destination_change_invalidates_review_and_keeps_all_node_ids(self):
        state = self.base / 'state.json'; artifact = self.base / 'capture.png'; artifact.write_bytes(b'proof')
        self.run_script('run-state.py', 'init', '--state', state, '--input', self.config)
        self.run_script('run-state.py', 'record', '--state', state, '--variant', '01', '--artifact', artifact,
                        '--target-id', 'canvas-A', '--node-id', '1:1', '--node-id', '1:2', '--status', 'reviewed')
        record = json.loads(state.read_text())['variants']['01']
        self.assertEqual(record['node_id'], ['1:1', '1:2'])
        self.assertEqual(record['status'], 'reviewed')
        self.run_script('run-state.py', 'record', '--state', state, '--variant', '01', '--target-id', 'canvas-B')
        self.assertEqual(json.loads(state.read_text())['variants']['01']['status'], 'draft')

    def test_atomic_replace_failure_retains_prior_bytes_and_cleans_temp(self):
        page = self.base / 'page.html'; page.write_text('usable')
        with patch('round_support.os.replace', side_effect=OSError('simulated disk failure')):
            with self.assertRaises(OSError): atomic_write(page, 'new incomplete publication')
        self.assertEqual(page.read_text(), 'usable')
        self.assertEqual(sorted(p.name for p in self.base.iterdir()), ['page.html', 'round.json'])

    def test_lab_initial_partial_css_final_and_preview(self):
        self.run_script('design-lab/assemble-round.py', self.config, '--draft')
        page = Path(self.cfg['lab']) / 'src/explorations/round-01.html'
        self.assertEqual(page.read_text().count('data-status="pending"'), 6)
        files = self.variant(lab=True)
        self.run_script('design-lab/assemble-round.py', self.config, '--draft')
        before = page.read_bytes()
        self.run_script('design-lab/assemble-round.py', self.config, '--preview', '01')
        self.assertEqual(page.read_bytes(), before)
        self.run_script('design-lab/assemble-round.py', self.config, '--final', success=False)
        self.assertEqual(page.read_bytes(), before)
        files['css'].unlink()
        self.run_script('design-lab/assemble-round.py', self.config, '--draft')
        self.assertEqual(page.read_text().count('data-status="pending"'), 6)
        self.assertTrue((page.parent / 'round-preview-r1-v01.html').is_file())

    def test_lab_final_checker_rejects_absent_variants_even_if_links_pass(self):
        # Stub only the external yarn-links dependency; real file checker still runs.
        binary = self.base / 'bin'; binary.mkdir()
        yarn = binary / 'yarn'; yarn.write_text('#!/bin/sh\nexit 0\n'); yarn.chmod(0o755)
        Path(self.cfg['lab']).mkdir()
        env = {**os.environ, 'PATH': str(binary) + os.pathsep + os.environ['PATH']}
        self.run_script('design-lab/check-round.py', self.config, '--final', success=False, env=env)
        self.run_script('design-lab/check-round.py', self.config, '--draft', env=env)

    def test_resume_checks_bytes_not_done_flags_and_preserves_user_work(self):
        state = self.base / 'process/round-1/run-state.json'
        artifact = self.base / 'board.html'; artifact.write_text('draft one')
        unrelated = self.base / 'notes.md'; unrelated.write_text('user work')
        self.run_script('run-state.py', 'init', '--state', state, '--input', self.config)
        self.run_script('run-state.py', 'record', '--state', state, '--variant', '01', '--assignment', 'builder-a', '--native-observation', 'native handle running', '--artifact', artifact, '--status', 'reviewed', '--target-id', 'target-a', '--node-id', 'node-b')
        snapshot = state.read_bytes()
        artifact.write_text('edited by user')
        result = self.run_script('run-state.py', 'reconcile', '--state', state)
        current = json.loads(result.stdout)
        self.assertEqual(current['variants']['01']['status'], 'stale')
        self.assertEqual(current['variants']['01']['native_observation'], 'native handle running')
        self.assertEqual(state.read_bytes(), snapshot)
        self.run_script('run-state.py', 'record', '--state', state, '--variant', '01', '--artifact', artifact)
        result = self.run_script('run-state.py', 'reconcile', '--state', state)
        self.assertEqual(json.loads(result.stdout)['variants']['01']['status'], 'draft')
        self.config.write_text(self.config.read_text() + ' ')
        self.run_script('run-state.py', 'record', '--state', state, '--variant', '01', '--status', 'reviewed', success=False)
        self.run_script('run-state.py', 'init', '--state', state, '--input', self.config, success=False)
        current = json.loads(self.run_script('run-state.py', 'reconcile', '--state', state).stdout)
        self.assertFalse(current['inputs_current'])
        self.assertEqual(current['variants']['01']['status'], 'stale')
        self.assertEqual(artifact.read_text(), 'edited by user')
        self.assertEqual(unrelated.read_text(), 'user work')


if __name__ == '__main__': unittest.main()
