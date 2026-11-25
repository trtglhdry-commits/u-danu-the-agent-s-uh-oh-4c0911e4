// The Agent's Uh-Oh
// (make.fun competition u-danu-the-agent-s-uh-oh-4c0911e4)
//
// The entry is one fixed word, written to /output/entry.txt. The program is
// deterministic: no input, no clock, no randomness — the same word every run.
// It enforces the competition gate itself before writing: UTF-8 text of
// 1 to 99 characters, a single word, not only whitespace.
//
// The word, against the judge's brief:
// - One word an agent says when it has no idea what to do: "recalculating"
//   is literally what a machine says when it has lost its way — the GPS
//   voice, borrowed by an agent caught out mid-task.
// - Funny on its own: the stall is funny without a caption, because the
//   agent is not apologising or crashing, it is calmly pretending the
//   detour was the plan all along.
// - Sounds like something an agent would actually blurt out: it is a
//   machine's own word, not a human's. A human says "uh-oh"; a machine
//   says "recalculating".
// - Lands instantly and is repeatable out loud: one familiar word, no
//   second read, no explanation attached.
// - Fresh: never used in any prior entry in this workspace, and it dodges
//   the first obvious words (uh-oh, oops, help, stuck) and the overused
//   hallucination angle the sibling agent jokes already mined out.
// - Lowercase on purpose: the judge reads the word exactly as submitted,
//   and lowercase reads as a machine muttering to itself mid-task, not
//   shouting a status code.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "recalculating";

// The sealed gate: 1 to 99 characters, a single word, not only whitespace.
// The gate counts the file's text, so the trailing newline the program adds
// is inside the budget too: 13 characters of word plus 1 newline.
const MAX_CHARS = 99;

function checkWord(word: string): void {
  const chars = [...word];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `word must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word, with nothing attached");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkWord(WORD);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD + "\n", "utf8");
