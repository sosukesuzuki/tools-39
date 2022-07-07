# tools-39

Command line tool for following TC39 activities.

## Installation

```
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/tools39/tools-39.ts
```

## Usage

### `tools-39 agendas yyyy/MM`

Example:

```
$ tools-39 agendas 2022/06
# 2022/6 TC39 meeting agenda

## For Stage 1

- [Duplicate named capture groups](https://github.com/bakkot/proposal-duplicate-named-capturing-groups) for stage 1, 2, or 3
- [`this` parameter](https://github.com/hax/proposal-this-parameter) for Stage 1, [slides](https://johnhax.net/2022/this-param/slide)
- [RegExp Atomic Operators](https://github.com/rbuckton/proposal-regexp-atomic-operators) for Stage 1 ([draft spec](https://rbuckton.github.io/proposal-regexp-atomic-operators/), [slides](https://1drv.ms/p/s!AjgWTO11Fk-Tkf5fz_Ayyt6gEMkBgQ?e=6eFHfI))

## For Stage 2

- [String.dedent](https://github.com/tc39/proposal-string-dedent) for stage 2 ([draft spec](https://tc39.es/proposal-string-dedent/), [slides](https://docs.google.com/presentation/d/1hjTOVvQVH-ieWf5ECgojR_JQmfjjnm5abMq_eXpP_lU/edit?usp=sharing))
- [Grouped and Auto-Accessors](https://github.com/tc39/proposal-grouped-and-auto-accessors) for stage 2 ([draft spec](https://tc39.es/proposal-grouped-and-auto-accessors/), [slides](https://1drv.ms/p/s!AjgWTO11Fk-Tkf5bHDNfAnGwyyzaKQ?e=Lgz7sc))

## For Stage 3

- [Symbols as WeakMap keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys) for stage 3 \[[spec](https://tc39.es/proposal-symbols-as-weakmap-keys/)] \[[slides](http://www.rricard.me/serve/tc39-jun2022-symbols-as-wm-keys.pdf)] \[[diff](https://arai-a.github.io/ecma262-compare/?pr=2777)]
- [RegExp Modifiers](https://github.com/tc39/proposal-regexp-modifiers) for Stage 3? ([spec](https://tc39.es/proposal-regexp-modifiers/), [slides](https://1drv.ms/p/s!AjgWTO11Fk-Tkf5daRnRsxu8BY5Nsg?e=UKVf8W), pending reviews)
- [JSON.parse source text access](https://github.com/tc39/proposal-json-parse-with-source) for Stage 3 ([spec](https://tc39.es/proposal-json-parse-with-source/), [slides](https://docs.google.com/presentation/d/1C2RLbE-SS8ldlQPfXgsvKJBrEIZb4s57pOn-LxBNaC0/))

## For Stage 4

- [`findLast`/`findLastIndex`](https://github.com/tc39/proposal-array-find-from-last/) for stage 4 ([slides](https://github.com/DanielRosenwasser/findLast-and-findLastIndex-for-Stage-4/raw/main/findLast%20%26%20findLastIndex%20for%20Stage%204%20\(TC39%20June%202022\).pdf))

## Others

- [Array Grouping](https://github.com/tc39/proposal-array-grouping) [rename groupBy to group](https://github.com/tc39/proposal-array-grouping/pull/39)
- ⏳ Decorators Normative Change: Flexible Initializers ([slides](https://slides.com/pzuraq/decorators-normative-changes-2022-06))
- ShadowRealm: [Implementation Status and normative updates](https://github.com/tc39/proposal-shadowrealm/issues/365), (slides TBD)
- [Errors across the ShadowRealm boundary](https://github.com/tc39/proposal-shadowrealm/issues/353)
- [Temporal](https://tc39.es/proposal-temporal/) [normative changes](https://github.com/tc39/proposal-temporal/pulls?q=is%3Aopen+is%3Apr+milestone%3A%22Next+batch+of+normative+changes%22) ([slides](http://ptomato.name/talks/tc39-2022-06/))
- Making TypedArray.prototype.with simpler in the change Array by copy proposal ([issue](https://github.com/tc39/proposal-change-array-by-copy/issues/85))
- ⏳ `Intl.DurationFormat` stage 3 update ([slides](https://notes.ryzokuken.dev/p/ac-rg2kZH#/))
- [function.sent](https://github.com/tc39/proposal-function.sent) update [slides](https://johnhax.net/2022/function-sent/slide)
- [Import Reflection](https://github.com/tc39/proposal-import-reflection) status update & discussion ([slides](https://docs.google.com/presentation/d/1y0MAo7ymIWzyyrU9o3oKLiHc4BtQwLtqlU4Z_8_XYjU/edit#slide=id.p)))
```
