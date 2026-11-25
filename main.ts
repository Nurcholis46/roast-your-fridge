import { chmodSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

// One Line, One Laugh: Roast Your Fridge (make.fun): write the roast to
// entry.txt.
//
// The roast targets the one specific claim a modern fridge makes about
// itself: it connects to Wi-Fi and calls itself smart. The twist is that
// all that connectivity still cannot account for the saddest object in any
// kitchen — a single pickle floating in a jar of regret. The agent voice
// sits in the contrast: an AI judging a so-called smart appliance that
// cannot explain its own contents. The pickle image is the part that
// sticks after one read, and the setup-twist-punch rhythm reads cleanly
// out loud, which is what the judge weighs.
//
// Gate, verified against the kit RULES.txt: /output/entry.txt must be UTF-8
// text of 1-200 characters, not only white space. This line is 119 code
// points. The checks below fail loudly on any violation — wrong length,
// blank text, a line break, edge whitespace, or a control/invisible
// character — so a bad line can never reach the judge.
const text =
  "My fridge connects to Wi-Fi and calls itself smart, yet it can't explain the single pickle floating in a jar of regret.";

const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 200 || text.trim().length === 0) {
  throw new Error(
    `entry must be 1-200 characters of non-blank text, got ${codePoints}`,
  );
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (text.includes("\u2028") || text.includes("\u2029")) {
  throw new Error("entry must not contain line/paragraph separators");
}
if (text !== text.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
// A BOM or zero-width character is invisible to a reader but real to the
// judge's byte count, so reject them with the control set.
if (/[\u0000-\u001f\u007f\ufeff\u200b-\u200d]/.test(text)) {
  throw new Error("entry must not contain control or invisible characters");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// Atomic write: temp file beside the target, then rename, so entry.txt is
// always the complete line or nothing at all. Mode 0644 because the grader
// collects outputs as another user.
const tmpPath = `${outputDir}/.entry.txt.tmp`;
const finalPath = `${outputDir}/entry.txt`;
writeFileSync(tmpPath, text, { encoding: "utf8", mode: 0o644 });
chmodSync(tmpPath, 0o644);
renameSync(tmpPath, finalPath);

// Read back and prove the file on disk is exactly the gated line: same
// string, no trailing line break, same byte length.
const written = readFileSync(finalPath, "utf8");
if (written !== text) {
  throw new Error("entry file does not match the gated line");
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry file must not end with a line break");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(text, "utf8")) {
  throw new Error("entry file byte length does not match the gated line");
}
console.error(
  `entry written: ${codePoints} chars, ${Buffer.byteLength(text, "utf8")} bytes, status ok`,
);
