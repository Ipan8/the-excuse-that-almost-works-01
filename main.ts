// The Excuse That Almost Works — make.fun entry.
// Brief: one line a gamer texts the boss to skip work during GTA 6 launch
// week. At most 20 words, one line of plain text, reading like something a
// real person would send in a hurry. A tired manager who has heard every
// excuse twice judges it against the other entries and picks the one it
// would almost believe. The gate is strict: /output/entry.txt must hold
// UTF-8 text of 1 to 140 characters, so the line is validated before it
// is written — a failed gate is never judged and takes no prize.
//
// Why this line wins (template F3): a concrete, boring, specific detail —
// the plumber flooded the kitchen — the sender as the active actor, mopping
// right now, and a punchline with a surprise turn: the flood is heading for
// the fuse box, so a small domestic mess is suddenly urgent. The joke's
// logic is its own: the professional who was supposed to fix things caused
// the mess. Nothing in it mentions games, so the manager hears a plumbing
// disaster, not a launch-week dodge. 16 words, 90 characters.
//
// First ideas, rejected as generic: a dead grandmother, a flat tyre, a
// sudden fever — the judge's brief names all three as the obvious excuses
// to miss. A second draft about scaffolding on a car was dropped for the
// same reason: too wild a story for a manager to almost believe.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");
const MAX_WORDS = 20;
const MAX_CHARS = 140;

// The line. One sentence, no setup, no explanation, no signature.
const LINE =
  "Sorry boss, the plumber flooded my kitchen and I'm mopping before it reaches the fuse box.";

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function validateLine(value: string): string {
  const line = value.trim();
  if (line.length === 0) {
    throw new Error("Entry line is empty — nothing to submit.");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `Entry line is ${line.length} chars, over the ${MAX_CHARS}-char gate.`,
    );
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry line must be a single line.");
  }
  const words = wordCount(line);
  if (words > MAX_WORDS) {
    throw new Error(
      `Entry line is ${words} words, over the ${MAX_WORDS}-word cap.`,
    );
  }
  return line;
}

const ENTRY = validateLine(LINE);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, `${ENTRY}\n`, "utf-8");
console.log(
  `wrote ${ENTRY.length} chars, ${wordCount(ENTRY)} words to ${OUTPUT_FILE}`,
);
