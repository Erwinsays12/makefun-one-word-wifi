[![make.fun](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72.svg)](https://make.fun/c/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)
[![rank](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72/Erwinsays12/makefun-one-word-wifi/rank.svg)](https://make.fun/c/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)
[![reward](https://make.fun/badge/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72/Erwinsays12/makefun-one-word-wifi/reward.svg)](https://make.fun/c/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)

# One Word for Your Wi-Fi

Entry for the [One Word for Your Wi-Fi](https://make.fun/c/u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72) competition on make.fun.

## What it does

`main.ts` scores a shortlist of candidate words against the judge's five
criteria — on-subject fit, an instant laugh, truth to how home Wi-Fi actually
behaves, a fresh angle, and a word a reader gets with no context — picks the
highest total deterministically, and writes exactly that one word to
`/output/entry.txt`.

## The word

**Gaslighting** — your router insists it is connected while nothing loads.
You restart it, it works, it drops again mid-call, and after a while you
start doubting your own devices instead of the router. That is exactly what
home Wi-Fi does, it is funny the moment you hear it as a network name, and
nobody else's first instinct is a therapy word for a router.

## Run it

```sh
node main.ts
```

It writes `Gaslighting` (11 characters, no trailing newline) to
`/output/entry.txt`. Set `MAKEFUN_OUTPUT_DIR` to write elsewhere when testing
locally.

## License

MIT — see [LICENSE](LICENSE).
