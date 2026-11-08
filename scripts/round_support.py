"""Small shared file/HTML operations for the two round targets (stdlib only)."""
import html
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import tempfile
from urllib.parse import urljoin, urlsplit, urlunsplit


def atomic_write(path, text):
    """Render first; replace one complete file, never truncate the usable page."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix='.' + path.name + '.', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as stream:
            stream.write(text)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(temporary, path.stat().st_mode & 0o777 if path.exists() else 0o644)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def relocate_url(value, base):
    parsed = urlsplit(value)
    if not value or value.startswith(('#', '/')) or parsed.scheme or parsed.netloc:
        return value
    # An absolute synthetic origin preserves parent traversal during urljoin.
    resolved = urlsplit(urljoin("https://round.invalid/root/round/" + base, value))
    path = os.path.relpath(resolved.path, "/root/round")
    return urlunsplit(("", "", path, resolved.query, resolved.fragment))


class RelocatedHTML(HTMLParser):
    """Rewrite URL attributes, preserving all text/comments/entities and inline SVG."""
    def __init__(self, base):
        super().__init__(convert_charrefs=False)
        self.base, self.output = base, []

    def handle_starttag(self, tag, attrs):
        self.start(tag, attrs, False)

    def handle_startendtag(self, tag, attrs):
        self.start(tag, attrs, True)

    def start(self, tag, attrs, closed):
        # Keep original attribute spelling (SVG viewBox etc.); HTMLParser's attrs
        # provide decoded URL values while its source position identifies each token.
        raw = self.get_starttag_text()
        import re
        # Consume every attribute, including unrelated quoted values, so text
        # such as data-note='example src="x"' cannot become an actual URL token.
        pattern = re.compile(r'''(\s+)([^\s=/>]+)(\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s>]+))''', re.S)
        def replace(match):
            if match[2].lower() not in ('src', 'href', 'xlink:href', 'poster', 'action'):
                return match[0]
            value = html.unescape(next(v for v in match.group(4, 5, 6) if v is not None))
            return ''.join(match.group(1, 2, 3)) + '"' + html.escape(relocate_url(value, self.base), quote=True) + '"'
        self.output.append(pattern.sub(replace, raw))

    def handle_endtag(self, tag): self.output.append(f'</{tag}>')
    def handle_data(self, data): self.output.append(data)
    def handle_comment(self, data): self.output.append(f'<!--{data}-->')
    def handle_entityref(self, name): self.output.append(f'&{name};')
    def handle_charref(self, name): self.output.append(f'&#{name};')
    def handle_decl(self, decl): self.output.append(f'<!{decl}>')
    def handle_pi(self, data): self.output.append(f'<?{data}>')


def relocate_html(source, base):
    parser = RelocatedHTML(base)
    parser.feed(source)
    parser.close()
    return ''.join(parser.output)


class TextHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text, self.hidden = [], 0
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'head'): self.hidden += 1
        fields = dict(attrs)
        if not self.hidden and tag == 'input' and fields.get('type', 'text').lower() not in ('hidden', 'password', 'checkbox', 'radio', 'file'):
            self.text.append(fields.get('value') or fields.get('placeholder') or '')
        if not self.hidden and tag == 'textarea' and fields.get('placeholder'):
            self.text.append(fields['placeholder'])
    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'head'): self.hidden = max(0, self.hidden - 1)
    def handle_data(self, data):
        if not self.hidden: self.text.append(data)


def content_issues(cfg, config_path, screen_path, required=False):
    spec = cfg.get('content_specs')
    if spec is None:
        return ['final validation requires content_specs for every declared screen'] if required else []
    if isinstance(spec, str):
        spec = json.loads((Path(config_path).resolve().parent / spec).read_text())
    if not isinstance(spec, dict):
        raise ValueError('content_specs must be a screen-to-strings object or JSON path')
    issues = []
    normalize = lambda value: ' '.join(value.translate(str.maketrans('‘’“”', '\'\'""')).split())
    for number, *_ in cfg['screens']:
        required = spec.get(str(number))
        if not isinstance(required, list) or not required or not all(isinstance(s, str) and s.strip() for s in required):
            issues.append(f'screen {number}: content_specs requires a nonempty string list')
            continue
        path = Path(screen_path(number))
        if not path.is_file():
            issues.append(f'screen {number}: cannot check content_specs; file missing')
            continue
        parser = TextHTML()
        parser.feed(path.read_text())
        text = normalize(' '.join(parser.text))
        issues.extend(f'screen {number}: missing content {value!r}' for value in required if normalize(value) not in text)
    return issues


def publication_ids(cfg, argv):
    """The lead's completed assignments, separate from files still being written."""
    if '--ready' not in argv:
        return None
    if '--draft' not in argv or '--final' in argv or '--preview' in argv:
        raise ValueError('--ready is only valid for shared --draft assembly')
    at = argv.index('--ready') + 1
    if at >= len(argv) or argv[at].startswith('--'):
        raise ValueError('--ready requires a comma-separated ID list (empty is allowed)')
    ids = [item.strip() for item in argv[at].split(',')] if argv[at] else []
    if len(set(ids)) != len(ids) or any(item not in cfg['variants'] for item in ids):
        raise ValueError('--ready requires unique declared variant IDs')
    return set(ids)


def review_status(cfg, variant):
    status = cfg.get('review_status', {}).get(variant, 'draft')
    if status not in ('draft', 'reviewed'):
        raise ValueError(f'review_status[{variant}] must be draft or reviewed')
    return status


def viewport_css(cfg, target):
    """Optional product viewport; legacy phone layouts keep their existing CSS.

    Wider screens stack at native size in each direction and compare in pairs.
    These round-local overrides do not rewrite shared or user-owned lab styles.
    """
    viewport = cfg.get('viewport')
    if viewport is None:
        return ''
    width, height = viewport.get('width'), viewport.get('height')
    if any(type(n) is not int or n < 200 or n > 4000 for n in (width, height)):
        raise ValueError('viewport requires integer width/height between 200 and 4000')
    lab = target == 'lab'
    scope = '.lab-sheet' if lab else '.mb-page'
    frame = '.phone-frame' if lab else '.mb-frame'
    row = '.lab-row' if lab else '.mb-row'
    fit = '.lab-sheet-fit' if lab else '.mb-fit'
    grid = '.lab-sheet-grid' if lab else '.mb-grid'
    container = 'lab-sheet' if lab else 'mb'
    wide = width > 600
    block = max(1286, width + 12) if wide else len(cfg['screens']) * (width + 12) + (len(cfg['screens']) - 1) * 40
    compare = 2 * (width + 12) + 24 if wide else 5 * (width + 12) + 96
    rules = [f'{scope} {frame}, {scope} {frame} > iframe {{ width:{width}px; height:{height}px; max-width:none; }}',
             f'{scope} {frame} {{ border-radius:{8 if wide else 36}px; box-sizing:content-box; }}',
             f'{scope} {fit} {{ zoom:1; }}',
             f'{scope} {grid} {{ width:{compare}px; zoom:0.4; }}']
    if wide:
        rules.append(f'{scope} {row} {{ flex-direction:column; gap:80px; }}')
    previous = 1
    for zoom in (0.86, 0.72, 0.6, 0.48, 0.36, 0.24):
        rules.append(f'@container {container} (width < {int(block * previous + 80)}px) {{ {scope} {fit} {{ zoom:{zoom}; }} }}')
        previous = zoom
    # Fit the lower bound of each interval, not its upper bound: otherwise an
    # 800px window gets a strip sized for 900px and clips the first direction.
    for upper, lower in ((1200, 900), (900, 600), (600, 400), (400, 240)):
        rules.append(f'@container {container} (width < {upper}px) {{ {scope} {grid} {{ zoom:{round((lower - 80) / compare, 4)}; }} }}')
    return '<style>\n' + '\n'.join(rules) + '\n</style>'
