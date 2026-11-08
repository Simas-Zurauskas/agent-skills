#!/usr/bin/env python3
"""Lead-owned resume record, stored as <process>/round-N/run-state.json.

init --state FILE --input FILE [--input FILE ...]
record --state FILE --variant NN [--assignment TEXT] [--native-observation TEXT]
       [--artifact FILE ...] [--status draft|reviewed] [--target-id ID] [--node-id ID]
reconcile --state FILE

Inputs and artifact bytes are checked on every record/reconcile. Reconcile is read-only:
status is reusable only when recorded identities still match. Native observations are
literal observations, never inferred from elapsed time. Only the lead writes this file.
To start changed inputs, choose a new state path; this helper never discards old work.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from round_support import atomic_write


def identity(path):
    path = Path(path).resolve()
    return {'path': str(path), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}


def matches(record):
    try:
        return identity(record['path']) == record
    except (OSError, KeyError, TypeError):
        return False


def reconcile(state):
    inputs_current = bool(state.get('inputs')) and all(matches(item) for item in state['inputs'])
    variants = {}
    for variant, record in state.get('variants', {}).items():
        artifacts = record.get('artifacts', [])
        artifacts_current = bool(artifacts) and all(matches(item) for item in artifacts)
        recorded_status = record.get('status')
        status = (recorded_status if recorded_status in ('draft', 'reviewed') else 'pending') if inputs_current and artifacts_current else 'stale' if artifacts or not inputs_current else 'pending'
        variants[variant] = {**record, 'status': status, 'artifacts_current': artifacts_current}
    return {'inputs_current': inputs_current, 'variants': variants}


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='command', required=True)
    for command in ('init', 'record', 'reconcile'):
        item = sub.add_parser(command)
        item.add_argument('--state', required=True)
        if command == 'init': item.add_argument('--input', action='append', required=True)
        if command == 'record':
            item.add_argument('--variant', required=True)
            item.add_argument('--assignment')
            item.add_argument('--native-observation')
            item.add_argument('--artifact', action='append')
            item.add_argument('--status', choices=('draft', 'reviewed'))
            item.add_argument('--target-id')
            item.add_argument('--node-id', action='append')
    args = parser.parse_args()
    path = Path(args.state)
    if args.command == 'init':
        inputs = [identity(item) for item in args.input]
        if path.exists():
            existing = json.loads(path.read_text())
            if existing.get('inputs') != inputs or existing.get('schema') != 1:
                parser.error('state exists for different inputs/schema; preserve it and choose a new state path')
            print(json.dumps(reconcile(existing), indent=2)); return
        state = {'schema': 1, 'inputs': inputs, 'variants': {}}
    else:
        state = json.loads(path.read_text())
        if state.get('schema') != 1: parser.error('unsupported state schema')
        result = reconcile(state)
        if args.command == 'reconcile':
            print(json.dumps(result, indent=2)); return
        if not result['inputs_current']:
            parser.error('inputs changed or missing; preserve this state and start a new state path')
        record = dict(state['variants'].get(args.variant, {}))
        for field in ('assignment', 'native_observation', 'target_id', 'node_id'):
            value = getattr(args, field)
            if value is not None:
                if field in ('target_id', 'node_id') and value != record.get(field):
                    record['status'] = 'draft'
                record[field] = value
        if args.artifact:
            new_artifacts = [identity(item) for item in args.artifact]
            if new_artifacts != record.get('artifacts'):
                record['status'] = 'draft'
            record['artifacts'] = new_artifacts
        if args.status:
            if not record.get('artifacts') or not all(matches(item) for item in record['artifacts']):
                parser.error('recording a status requires current artifact identities')
            record['status'] = args.status
        record['observed_at'] = datetime.now(timezone.utc).isoformat()
        state['variants'][args.variant] = record
    atomic_write(path, json.dumps(state, indent=2) + '\n')
    print(json.dumps(reconcile(state), indent=2))


if __name__ == '__main__':
    main()
