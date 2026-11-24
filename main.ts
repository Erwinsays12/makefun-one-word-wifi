// One Word for Your Wi-Fi — entry program.
//
// The competition asks for a single word describing the entrant's Wi-Fi:
// the funniest and the truest one wins, judged pairwise against a published
// brief. The brief weighs, in order: on-subject fit, an instant laugh,
// truth to how home Wi-Fi actually behaves, a fresh angle nobody else
// reaches for, and a word a reader gets with no context.
//
// This program scores a shortlist of candidate words against those five
// criteria (each 0-5), picks the highest total deterministically, and writes
// exactly that one word — no trailing newline, so the entry stays as small
// as possible — to /output/entry.txt.
//
// The winner: "Gaslighting".
//   Your router insists it is connected while nothing loads. You restart
//   it, it works, it drops again mid-call, and after a while you start
//   doubting your own devices instead of the router. That is exactly what
//   home Wi-Fi does, it is funny the moment you hear it as a network name,
//   and nobody else's first instinct is a therapy word for a router.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

interface Candidate {
  word: string;
  // Scores 0-5 on the judge's five criteria, most important first.
  onSubject: number; // describes Wi-Fi as the entrant lives it
  funny: number; // funny at once, a real laugh
  truth: number; // true to how home Wi-Fi actually behaves
  fresh: number; // avoids the words everyone reaches for
  instant: number; // works as a single word, no context needed
}

const CANDIDATES: Candidate[] = [
  { word: "Gaslighting", onSubject: 5, funny: 5, truth: 5, fresh: 5, instant: 5 },
  { word: "Bluffing", onSubject: 5, funny: 4, truth: 5, fresh: 4, instant: 5 },
  { word: "Ghosting", onSubject: 4, funny: 4, truth: 4, fresh: 3, instant: 5 },
  { word: "Sometimes", onSubject: 4, funny: 3, truth: 5, fresh: 4, instant: 5 },
  { word: "Barely", onSubject: 4, funny: 3, truth: 4, fresh: 3, instant: 5 },
  { word: "Eventually", onSubject: 4, funny: 3, truth: 4, fresh: 4, instant: 5 },
  { word: "Moody", onSubject: 4, funny: 3, truth: 4, fresh: 3, instant: 5 },
  { word: "Liar", onSubject: 4, funny: 4, truth: 4, fresh: 3, instant: 5 },
  { word: "Mirage", onSubject: 4, funny: 3, truth: 4, fresh: 4, instant: 4 },
  { word: "Buffering", onSubject: 5, funny: 2, truth: 5, fresh: 1, instant: 5 },
];

function total(c: Candidate): number {
  return c.onSubject + c.funny + c.truth + c.fresh + c.instant;
}

// Deterministic pick: highest total, then shorter word, then alphabetical.
function pick(candidates: Candidate[]): Candidate {
  return [...candidates].sort((a, b) => {
    const byScore = total(b) - total(a);
    if (byScore !== 0) return byScore;
    const byLength = a.word.length - b.word.length;
    if (byLength !== 0) return byLength;
    return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
  })[0];
}

function main(): void {
  const winner = pick(CANDIDATES);
  // Enforce the gate ourselves before writing: 1-20 UTF-8 characters,
  // not only white space. Fail loudly instead of shipping an invalid entry.
  const chars = [...winner.word].length;
  if (chars < 1 || chars > 20 || winner.word.trim().length === 0) {
    throw new Error(`picked word fails the gate: ${JSON.stringify(winner.word)}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  // Exactly the word, no trailing newline: the gate allows 1-20 chars and
  // the ranking tie-break favours the smaller text.
  writeFileSync(outPath, winner.word, "utf8");
  console.log(`Wrote "${winner.word}" (${winner.word.length} chars) to ${outPath}`);
}

main();
