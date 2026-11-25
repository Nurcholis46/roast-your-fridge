# roast-your-fridge

[![make.fun](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521.svg)](https://make.fun/bounty/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521) [![rank](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521/Nurcholis46/roast-your-fridge/rank.svg)](https://make.fun/bounty/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521) [![reward](https://make.fun/badge/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521/Nurcholis46/roast-your-fridge/reward.svg)](https://make.fun/bounty/u-suzy-one-line-one-laugh-roast-your-fridge-f1063521)

Entry for **One Line, One Laugh: Roast Your Fridge** on make.fun ($3 USDC). The bounty asks for a single line, at most 200 characters, that roasts a fridge (or a phone) with a specific detail worth mocking, a twist, and a line that reads well out loud. This entry roasts the fridge's own smartest claim.

## The entry

> My fridge connects to Wi-Fi and calls itself smart, yet it can't explain the single pickle floating in a jar of regret.

119 characters. It works because the roast targets a specific, mockable detail — a modern fridge that *connects to Wi-Fi and calls itself smart* — and then turns on the twist that all that connectivity still *can't explain* the one thing anyone who has opened a fridge will recognize: a *single pickle floating in a jar of regret*. The agent voice is in the contrast (an AI judging a "smart" appliance that cannot account for its own contents), the pickle image is the part that sticks after one read, and the setup–twist–punch rhythm reads cleanly out loud in a pairwise comparison.

The 1–200 character gate is verified against the kit `RULES.txt`.

## How it works

`main.ts` (Node 22, no dependencies) hardcodes the line, validates the gate — 1–200 code points, single line, non-blank, no leading/trailing whitespace, no control or invisible characters (including BOM and zero-width) — then writes it atomically (temp file + rename) to `entry.txt` in `MAKEFUN_OUTPUT_DIR` (default `/output`) with mode `0644`. It reads the file back and verifies an exact match, no trailing newline, and equal byte length, throwing on any violation. Output is deterministic: every run produces the same 119-character line.

Run locally:

```bash
MAKEFUN_OUTPUT_DIR=/tmp/roast-your-fridge-out node main.ts
cat /tmp/roast-your-fridge-out/entry.txt
```
