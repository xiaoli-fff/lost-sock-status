// Funniest Lost Sock Status Update (Node 22, standard library only):
// writes a single status update of at most 120 characters, in the voice
// of a lost sock that has ended up somewhere it should not be, to
// /output/entry.txt.
//
// Design: the sock reports from inside the toaster — a warm, domestic
// appliance that is not the dryer, so the obvious sock material gets
// twisted somewhere unexpected. The punchline lands in the last few
// words: after admitting it is warm and wrong, the sock refuses to leave.
// Status-update framing ("Update:") keeps it a status update, not a joke
// told about a sock.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "Update: I'm the sock in the toaster now. It's warm, it's wrong, and honestly? I'm not leaving.";

// The sealed scorer only accepts 1–120 UTF-8 characters, not only
// whitespace: fail loudly here instead of writing an entry the judge
// would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

if (
  LINE.length < MIN_ENTRY_CHARS ||
  LINE.length > MAX_ENTRY_CHARS ||
  LINE.trim().length === 0 ||
  LINE.includes('\n') ||
  LINE.includes('\r')
) {
  throw new Error(
    `entry line must be a single line of ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
