# Dependency Upgrade to Latest (2026-06-05) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade every dependency in reaviz to its latest version where compatible, in risk-ordered batches with full verification between each, while documenting the two upgrades that are intentionally deferred.

**Architecture:** Ten sequential tasks, each independently green and committed: Node floor + CI first (prerequisite for everything), then low-risk minors, then one major-version cluster at a time (Storybook → jsdom → ESLint-adjacent → React 19 → TypeScript 6 → Vite 8), riskiest last. Every claim below was verified against npm peer-dep metadata and official changelogs on 2026-06-05.

**Tech Stack:** npm >=10.8.2, Node >=22.12, Vite library mode, Vitest 4 + jsdom, Storybook 10, ESLint 9 flat config.

---

## Current state → target state

### Runtime `dependencies` (consumer-facing)

All already at latest **except one**:

| Package | Current | Latest | Action |
|---|---|---|---|
| ellipsize | ^0.6.2 | 0.7.0 | Upgrade (Task 3). 0.7.0 is CJS→ESM only; `ellipsize(str, max)` signature unchanged. Call sites: `src/Sankey/SankeyLabel/SankeyLabel.tsx`, `src/common/Axis/LinearAxis/LinearAxisTickSeries.tsx`, `src/SunburstChart/SunburstArcLabel.tsx` — none need changes. 0.7.0 already coexists in the tree via reablocks. |
| everything else (motion, reablocks, chroma-js, classnames, d3-*, etc.) | — | — | Already latest. No action. |

### devDependencies — upgrades in this plan

| Package | Current | Target | Task |
|---|---|---|---|
| @storybook/test-runner | ^0.24.3 | ^0.24.4 | 3 |
| date-fns | ^4.1.0 | ^4.4.0 | 3 |
| @typescript-eslint/eslint-plugin + parser | ^8.59.3 | ^8.60.1 | 3 |
| postcss | ^8.5.14 | ^8.5.15 | 3 |
| @types/classnames | ^2.3.4 | **REMOVE** (deprecated stub; classnames@2.5.1 ships its own types) | 3 |
| storybook, @storybook/addon-docs, @storybook/react-vite, eslint-plugin-storybook | 10.3.6 (exact) | 10.4.2 (exact, lockstep — react-vite@10.4.2 peers storybook ^10.4.2) | 4 |
| jsdom | ^26.1.0 | ^29.1.1 | 5 |
| postcss-preset-env | ^10.6.1 | ^11.3.0 | 5 |
| @eslint/compat | ^1.4.1 | ^2.1.0 (peer allows eslint 9) | 6 |
| globals | ^16.5.0 | ^17.6.0 | 6 |
| eslint-plugin-react-hooks | ^5.2.0 | ^7.1.1 (peer allows eslint ^9; `plugin:react-hooks/recommended` legacy preset still resolves via FlatCompat) | 6 |
| react, react-dom | ^18.3.1 | ^19.2.7 | 7 |
| @types/react / @types/react-dom | ^18.3.28 / ^18.3.7 | ^19.2.16 / ^19.2.3 | 7 |
| typescript | ^5.9.2 | ^6.0.3 | 8 |
| vite | ^7.3.3 | ^8.0.16 | 9 |
| @vitejs/plugin-react | ^5.2.0 | ^6.0.2 (requires vite 8; Babel removed — repo passes no babel options, no migration) | 9 |
| vite-plugin-checker | ^0.10.3 | ^0.14.1 | 9 |
| vite-plugin-css-injected-by-js | ^3.5.2 | ^5.0.1 (v5 peers vite >8.0.0-0) | 9 |
| vite-plugin-static-copy | ^3.4.0 | ^4.1.0 (**requires `rename: { stripBase: true }` fix** — see Task 9) | 9 |
| vite-plugin-svgr | ^4.5.0 | ^5.2.0 | 9 |
| vite-tsconfig-paths | ^5.1.4 | ^6.1.1 | 9 |

### Deferred — do NOT upgrade (re-check periodically)

| Package | Current | Latest | Why deferred |
|---|---|---|---|
| eslint + @eslint/js | 9.39.4 (latest 9.x) | 10.4.1 / 10.0.1 | **Hard blocker:** eslint-plugin-react has no ESLint-10-compatible release (latest 7.37.5, peer `eslint ^3…^9.7`; crashes at runtime under ESLint 10 with `contextOrFilename.getFilename is not a function`). Track https://github.com/jsx-eslint/eslint-plugin-react/issues/3977 — when a fixed release ships, upgrade eslint+@eslint/js+eslint-plugin-react together. Everything else in the config (typescript-eslint 8.60.1, @eslint/compat 2, react-hooks 7.1.1, eslint-config-prettier 10.1.8, FlatCompat) already supports ESLint 10. |
| vite-plugin-dts | ^4.5.4 | 5.0.2 | Intentional skip: v5 re-platforms onto unplugin-dts whose api-extractor path bundles typescript@5.9.x — a functional risk under TS 6. v4.5.4 declares `vite: '*'` and `typescript: '*'` peers, so it works with both Vite 8 and TS 6. Current usage (`insertTypesEntry`, `include`) needs nothing from v5. Revisit when unplugin-dts supports TS 6. |
| overrides.uuid | ^11.1.1 | 14.0.0 exists | Keep at ^11.1.1. The override exists to dedupe uuid pulled by @storybook/test-runner → jest-junit/nyc (which pin uuid ^8). uuid 12+ changed exports; bumping the override gains nothing and risks breaking jest-junit. |
| @eslint/eslintrc, eslint-config-prettier, eslint-plugin-react, eslint-plugin-no-relative-import-paths, autoprefixer, tailwindcss, @tailwindcss/postcss, @mdx-js/react, vitest, @vitest/coverage-v8 | — | — | Already at latest. No action. |

### Other verified facts the tasks rely on

- **vitest@4.1.8 peers `vite ^6 || ^7 || ^8`** → Vite 8 is not blocked by vitest. @vitest/coverage-v8 rides vitest's peer.
- **@storybook/react-vite@10.4.2 peers `vite ^5–^8` and `react` up to 19** → Storybook bump (Task 4) is independent of both Vite 8 and React 19 tasks.
- **reablocks@10.2.0 peers react >=18 + node >=22; motion@12 peers react ^18||^19** → React 19 is unblocked. The repo's engines.node `>=18.0.0` is *already* violated by reablocks/vitest in the current tree — Task 2 is overdue, not net-new.
- **reaviz-data-utils@1.0.0 (latest) peers `react ^18.3.1`** → React 19 install needs an override (Task 7). Upstream fix: publish reaviz-data-utils with `react ^18.3.1 || ^19.0.0` peer (separate repo, out of scope here).
- **TypeScript 6.0 flips the `strict` default to true** → without an explicit `"strict": false`, `tsc --noEmit` produces ~302 strictNullChecks errors across 79 files, and because vite-plugin-checker runs tsc during `vite build`, `npm run build` and `npm start` fail too. Task 8 sets it explicitly *before* the TS bump.
- **vite-plugin-static-copy@4 always preserves directory structure** (v3 default flattened). Without a fix, `dist/stories/` becomes nested, silently breaking `scripts/stories.cjs` (globs `dist/stories/*.tsx`, single level) and the published `./stories/*` export map. v4 README: "Use `rename: { stripBase: true }` for flat copy."
- **Vite 8 swaps Rollup/esbuild for Rolldown/Oxc.** `build.rollupOptions` keeps working via a compat layer. UMD output for single-entry libs is *believed* retained (only SystemJS/AMD documented as removed) but **not confirmed by primary sources** — Task 9 verifies `dist/index.umd.cjs` is produced and has an explicit abort/fallback if not.
- **Vite 8 switches default CSS minifier to Lightning CSS.** `build.minify: false` does NOT disable CSS minification (independent option). Task 9 pins `cssMinify: false` to keep the published CSS byte-stable (consumers minify themselves; JS is already unminified by design).
- `src/RadialGauge/RadialGaugeSeries/RadialGaugeStackedArc.tsx` imports `JSX` from `'react'` (scoped import, supported by @types/react 19) — **no change needed** there, despite using `JSX.Element`.
- CI Node version is driven by `node-version-file: 'package.json'` → updating `engines.node` updates CI automatically. npm-publish.yml runs `npm ci` → **the lockfile must be committed with every task**.

---

### Task 1: Branch + baseline verification

**Files:** none modified.

- [ ] **Step 1: Create the working branch**

```bash
cd /Users/c4r0n0s/Projects/gg/reaviz
git checkout master && git pull
git checkout -b deps/upgrade-all-2026-06
```

- [ ] **Step 2: Clean install and capture baseline**

```bash
npm ci
npm run ts:check && npm run lint && npm run test:ci && npm run build && npm run build-storybook
```

Expected: all five commands exit 0. `test:ci` reports 6 test files passed.

- [ ] **Step 3: Record the dist contract for later comparison (Task 9 depends on this)**

```bash
ls dist/index.js dist/index.umd.cjs dist/index.d.ts
ls dist/stories/ | head -20
find dist/stories -type d | wc -l    # expect 1 (flat — no subdirectories)
ls dist/blocks/ | head
```

Expected: all three index files exist; `dist/stories/` is FLAT (only `.story.tsx` files, no chart subdirectories); note the file count of `ls dist/stories | wc -l` for Task 9.

If any baseline command fails, STOP — fix master first; do not start the upgrade from a red baseline.

---

### Task 2: Raise Node floor + CI hygiene

The current `>=18.0.0` is already violated by installed deps (reablocks needs >=22, vitest 4 needs ^20||^22||>=24). Vite 8 needs ^20.19||>=22.12; vite-plugin-static-copy@4 needs ^22||>=24. CLAUDE.md already documents Node >=22. New floor: `>=22.12.0`.

**Files:**
- Modify: `package.json:5-7`
- Modify: `.github/workflows/build.yml:15-23`

- [ ] **Step 1: Update engines**

In `package.json`, change:

```json
  "engines": {
    "node": ">=18.0.0"
  },
```

to:

```json
  "engines": {
    "node": ">=22.12.0"
  },
```

- [ ] **Step 2: Update build.yml (stale label + ancient action majors)**

In `.github/workflows/build.yml`, change:

```yaml
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Use Node.js 18.x
        uses: actions/setup-node@v3
        with:
          node-version-file: 'package.json'
```

to:

```yaml
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Use Node.js (from package.json engines)
        uses: actions/setup-node@v4
        with:
          node-version-file: 'package.json'
```

(Leave `.github/workflows/npm-publish.yml` alone — it already reads `node-version-file: 'package.json'`, so it inherits the new floor.)

- [ ] **Step 3: Verify local Node satisfies the new floor**

```bash
node --version
```

Expected: v22.12.0 or newer (machine currently has v22.14.0).

- [ ] **Step 4: Commit**

```bash
git add package.json .github/workflows/build.yml
git commit -m "Raise Node engines floor to >=22.12.0 and update CI actions"
```

---

### Task 3: Low-risk batch (patches, minors, cleanups)

**Files:**
- Modify: `package.json` (versions only — no source changes)

- [ ] **Step 1: Remove the deprecated stub types package**

```bash
npm uninstall @types/classnames
```

(classnames@2.5.1 ships its own `index.d.ts`; the stub is deprecated upstream.)

- [ ] **Step 2: Install the batch**

```bash
npm install -D @storybook/test-runner@^0.24.4 date-fns@^4.4.0 \
  @typescript-eslint/eslint-plugin@^8.60.1 @typescript-eslint/parser@^8.60.1 \
  postcss@^8.5.15
npm install ellipsize@^0.7.0
```

Note: @typescript-eslint plugin and parser must move together (parser peer is pinned to the plugin's version).

- [ ] **Step 3: Verify**

```bash
npm run ts:check && npm run lint && npm run test:ci
```

Expected: all exit 0. ellipsize's CJS→ESM switch is transparent to the Vite/ESM build; its `ellipsize(str, max)` signature is unchanged at all 3 call sites.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Update minor/patch devDependencies, ellipsize 0.7, drop @types/classnames stub"
```

---

### Task 4: Storybook 10.3.6 → 10.4.2 (exact-pinned lockstep)

All four move together: @storybook/react-vite@10.4.2 and eslint-plugin-storybook@10.4.2 both peer `storybook ^10.4.2`. 10.4.x is a no-breaking-change minor. Keep the exact pins (repo convention).

**Files:**
- Modify: `package.json:120,121,145,159` (versions only)

- [ ] **Step 1: Install with exact pins**

```bash
npm install -D --save-exact storybook@10.4.2 @storybook/addon-docs@10.4.2 \
  @storybook/react-vite@10.4.2 eslint-plugin-storybook@10.4.2
```

- [ ] **Step 2: Verify package.json kept exact versions (no carets)**

```bash
grep -E '"(storybook|@storybook/addon-docs|@storybook/react-vite|eslint-plugin-storybook)"' package.json
```

Expected: all four show `"10.4.2"` with no `^`.

- [ ] **Step 3: Verify Storybook builds and lint config still loads the storybook plugin**

```bash
npm run lint && npm run build-storybook
```

Expected: exit 0. The `.storybook/` imports (`storybook/manager-api`, `storybook/theming/create`) are stable within the 10.x line.

- [ ] **Step 4: Visual regression check**

```bash
npm start &
sleep 30 && npm run test-storybook
kill %1
```

Expected: snapshot tests pass unchanged (10.4 is a minor; rendering identical).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "Update Storybook family to 10.4.2"
```

---

### Task 5: jsdom 26 → 29 + postcss-preset-env 10 → 11

jsdom 27/28/29 changes (selector engine, PointerEvent clicks, CSSOM rewrite) are inert here: the 6 unit test files are pure-logic and use no `.click()`/`getComputedStyle`/`querySelector`. postcss-preset-env isn't referenced by `postcss.config.mjs` (Tailwind v4 handles nesting/prefixing) — its only live constraint is Node >=20.19, satisfied by Task 2.

**Files:**
- Modify: `package.json` (versions only)

- [ ] **Step 1: Install**

```bash
npm install -D jsdom@^29.1.1 postcss-preset-env@^11.3.0
```

- [ ] **Step 2: Verify the test environment**

```bash
npm run test:ci
npm ls jsdom
```

Expected: 6 test files pass; `npm ls jsdom` shows a single deduped 29.1.1 (vitest's jsdom peer is unpinned `*`).

- [ ] **Step 3: Verify the css pipeline (storybook uses postcss)**

```bash
npm run build-storybook
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Update jsdom to 29 and postcss-preset-env to 11"
```

---

### Task 6: ESLint-adjacent majors (staying on ESLint 9)

ESLint 10 itself is **blocked** (see Deferred table) — but three satellites can move now: @eslint/compat@2.1.0 (peer `eslint ^8.40 || 9 || 10`), globals@17.6.0 (only breaking change: audioWorklet split out of `browser` — unused here; `globals.browser` and `globals.vitest` both still exist), eslint-plugin-react-hooks@7.1.1 (peer `eslint ^3…^9 || ^10`; the legacy `plugin:react-hooks/recommended` preset string consumed via FlatCompat in `eslint.config.ts:48` still resolves in v7 — v7 only removed the `flat/recommended` alias, which the repo doesn't use).

**Files:**
- Modify: `package.json` (versions only; `eslint.config.ts` expected unchanged)

- [ ] **Step 1: Install**

```bash
npm install -D @eslint/compat@^2.1.0 globals@^17.6.0 eslint-plugin-react-hooks@^7.1.1
```

Note: react-hooks v7 pulls @babel/core, hermes-parser, zod as transitive deps (React Compiler tooling) — a heavier install is expected and harmless.

- [ ] **Step 2: Verify lint runs clean**

```bash
npm run lint
```

Expected: exit 0, same warnings as baseline (`react-hooks/exhaustive-deps` warns are pre-existing).

**Contingency** — only if lint fails with a config-resolution error on `plugin:react-hooks/recommended`: replace the FlatCompat consumption with the plugin's native flat config. In `eslint.config.ts`, remove `'plugin:react-hooks/recommended',` from the `compat.extends(...)` list (line 48), remove `'react-hooks': fixupPluginRules(reactHooks)` from `plugins` (line 56), and add `reactHooks.configs.recommended` as a separate entry in the `extends` array after the `fixupConfigRules(...)` call:

```ts
    extends: [
      ...fixupConfigRules(
        compat.extends(
          'eslint:recommended',
          'plugin:react/recommended',
          'prettier',
          'plugin:storybook/recommended'
        )
      ),
      reactHooks.configs.recommended
    ],
```

(`react-hooks/exhaustive-deps: ['warn']` in the rules block stays — it overrides the preset either way.)

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Update eslint compat/globals/react-hooks plugin majors (ESLint stays 9.x)"
```

---

### Task 7: React 19 (dev environment + types)

This is a **dev-only** upgrade: published `peerDependencies` stay `react >=16` (already covers 19; grep-verified that src uses no removed React 19 runtime API). All four packages move at once (@types/react-dom@19 peers @types/react ^19). Source impact is 6 lines: 5 no-arg `useRef()` calls (TS2554 under @types/react 19) and one bare-`ReactElement` `.props` read (props now default to `unknown`).

**Files:**
- Modify: `package.json` (overrides + versions)
- Modify: `src/common/Tooltip/TooltipArea.tsx:186`
- Modify: `src/common/Gestures/Move.tsx:40`
- Modify: `src/common/ZoomPan/ZoomPan.tsx:167-168`
- Modify: `src/common/Brush/Brush.tsx:53`
- Modify: `src/common/utils/wrapText.tsx:33`

- [ ] **Step 1: Neutralize the reaviz-data-utils peer conflict**

reaviz-data-utils@1.0.0 (latest) peers `react ^18.3.1`, which hard-fails `npm install` against react 19 (ERESOLVE). In `package.json`, change:

```json
  "overrides": {
    "uuid": "^11.1.1"
  }
```

to:

```json
  "overrides": {
    "uuid": "^11.1.1",
    "reaviz-data-utils": {
      "react": "$react"
    }
  }
```

(Fallback if npm still refuses: run the Step 2 install with `--legacy-peer-deps`. Long-term fix is publishing reaviz-data-utils with a `^18.3.1 || ^19.0.0` peer — separate repo, out of scope.)

- [ ] **Step 2: Install the React 19 set**

```bash
npm install -D react@^19.2.7 react-dom@^19.2.7 @types/react@^19.2.16 @types/react-dom@^19.2.3
```

- [ ] **Step 3: Fix the five no-arg useRef call sites**

`src/common/Tooltip/TooltipArea.tsx:186`:
```ts
    const ref = useRef<SVGRectElement | SVGPathElement | any>(null);
```

`src/common/Gestures/Move.tsx:40` (rAF id holder):
```ts
  const rqf = useRef<number>(undefined);
```

`src/common/ZoomPan/ZoomPan.tsx:167-168` (gesture instance holders):
```ts
  const zoomRef = useRef<Zoom>(undefined);
  const panRef = useRef<Pan>(undefined);
```

`src/common/Brush/Brush.tsx:53` (DOM ref):
```ts
  const ref = useRef<any>(null);
```

Rule applied: `null` where the ref is attached to an element `ref` prop, `undefined` for plain mutable holders.

- [ ] **Step 4: Fix the bare-ReactElement props access**

Under @types/react 19, `ReactElement` without a props generic defaults props to `unknown`, so `src/FunnelChart/FunnelSeries/FunnelAxis/FunnelAxisLabel.tsx:129` (`acc + curr.props.dy`) errors with TS18046 — this fires even under this repo's lenient (non-strict) tsconfig. Fix at the source: in `src/common/utils/wrapText.tsx:33`, change the return type:

```ts
}: WrapTextInputs): ReactElement<any> | ReactElement<any>[] | null {
```

(No change needed in FunnelAxisLabel.tsx itself. No change needed in `src/RadialGauge/RadialGaugeSeries/RadialGaugeStackedArc.tsx` either — it imports `JSX` from `'react'`, which @types/react 19 supports.)

- [ ] **Step 5: Verify types, then everything**

```bash
npm run ts:check
```

Expected: exit 0. If any new TS2554/TS2503/TS18046 errors appear at other sites, fix them with the same patterns (they would be in story files, which tsconfig also includes).

```bash
npm run lint && npm run test:ci && npm run build && npm run build-storybook
```

Expected: all exit 0.

- [ ] **Step 6: Visual regression check (rendering under React 19)**

```bash
npm start &
sleep 30 && npm run test-storybook
kill %1
```

Expected: snapshots unchanged — SVG output is identical under React 19.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/common/Tooltip/TooltipArea.tsx \
  src/common/Gestures/Move.tsx src/common/ZoomPan/ZoomPan.tsx \
  src/common/Brush/Brush.tsx src/common/utils/wrapText.tsx
git commit -m "Update dev environment to React 19 with @types/react 19 type fixes"
```

---

### Task 8: TypeScript 5.9 → 6.0

The repo's tsconfig already matches TS 6 defaults (target ES2015, module esnext, moduleResolution bundler, explicit `types`). Two edits are **mandatory before** the version bump: (1) TS 6 flips the `strict` default to true — without an explicit `"strict": false` the repo gets ~302 strictNullChecks errors, and since vite-plugin-checker runs tsc inside `vite build`/`vite dev`, **build and storybook fail too**, not just ts:check; (2) `ignoreDeprecations: "5.0"` is obsolete (no deprecated options are used). vite-plugin-dts intentionally stays at 4.5.4 (`typescript: '*'` peer) — see Deferred table.

**Files:**
- Modify: `tsconfig.json:16,27`
- Modify: `package.json` (typescript version)

- [ ] **Step 1: Edit tsconfig.json**

Change lines 16 and 27 — from:

```json
    "noImplicitAny": false,
```
```json
    "ignoreDeprecations": "5.0",
```

to (add `strict` alongside the existing flag; delete the deprecations line):

```json
    "strict": false,
    "noImplicitAny": false,
```

(the `"ignoreDeprecations": "5.0",` line is removed entirely)

- [ ] **Step 2: Verify the edit is inert under TS 5.9**

```bash
npm run ts:check
```

Expected: exit 0 (strict:false is the current effective behavior, now explicit).

- [ ] **Step 3: Install TypeScript 6**

```bash
npm install -D typescript@^6.0.3
```

(@typescript-eslint 8.60.1 peer is `typescript >=4.8.4 <6.1.0` ✓; vite-plugin-checker and vite-plugin-dts peer `typescript: '*'` ✓; react-docgen-typescript peers `>= 4.3.x` ✓.)

- [ ] **Step 4: Verify the full toolchain under TS 6**

```bash
npm run ts:check && npm run lint && npm run build && npm run test:ci
```

Expected: all exit 0. `npm run build` confirms vite-plugin-checker and vite-plugin-dts both operate under TS 6; spot-check `dist/index.d.ts` exists and exports the public API (`grep -c "export" dist/index.d.ts` > 100).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "Update TypeScript to 6.0 with explicit strict:false"
```

---

### Task 9: Vite 7 → 8 + plugin majors (riskiest — Rolldown bundler swap)

vitest@4.1.8 (`vite ^6||^7||^8`) and @storybook/react-vite@10.4.2 (`vite ^5–^8`) both accept Vite 8 — no peer blockers. vite-plugin-dts stays at 4.5.4. Two config edits are required to preserve the published-package contract.

**Files:**
- Modify: `package.json` (versions)
- Modify: `vite.config.ts:30-41,52-54`

- [ ] **Step 1: Install the Vite 8 group**

```bash
npm install -D vite@^8.0.16 @vitejs/plugin-react@^6.0.2 vite-plugin-checker@^0.14.1 \
  vite-plugin-css-injected-by-js@^5.0.1 vite-plugin-static-copy@^4.1.0 \
  vite-plugin-svgr@^5.2.0 vite-tsconfig-paths@^6.1.1
```

(Do NOT add vite-plugin-dts@5 — intentionally kept at ^4.5.4. Expect harmless unmet-*optional*-peer warnings from vite-plugin-checker 0.14's new optional integrations: @biomejs/biome, oxlint, stylelint, vue-tsc.)

- [ ] **Step 2: Fix static-copy flattening (required — published layout contract)**

vite-plugin-static-copy@4 removed the v3 default flattening and always preserves directory structure, which would emit `dist/stories/BarChart/X.story.tsx` instead of flat `dist/stories/X.story.tsx` — silently breaking `scripts/stories.cjs` (globs only `dist/stories/*.tsx`) and the published `"./stories/*"` export. In `vite.config.ts`, change:

```ts
        viteStaticCopy({
          targets: [
            {
              src: 'src/**/*.story.tsx',
              dest: 'stories/'
            },
            {
              src: 'blocks/*.story.tsx',
              dest: 'blocks/'
            }
          ]
        })
```

to:

```ts
        viteStaticCopy({
          targets: [
            {
              src: 'src/**/*.story.tsx',
              dest: 'stories/',
              rename: { stripBase: true }
            },
            {
              src: 'blocks/*.story.tsx',
              dest: 'blocks/',
              rename: { stripBase: true }
            }
          ]
        })
```

- [ ] **Step 3: Pin CSS minification off (byte-stable published CSS)**

Vite 8 switches the default CSS minifier from esbuild to Lightning CSS, and `build.minify: false` does NOT cover CSS (`cssMinify` is independent). The library ships unminified JS by design; make CSS match. In `vite.config.ts`, change:

```ts
      build: {
        minify: false,
        sourcemap: true,
```

to:

```ts
      build: {
        minify: false,
        cssMinify: false,
        sourcemap: true,
```

(Leave `build.rollupOptions` as-is — Vite 8's compat layer runs rollup-plugin-peer-deps-external unchanged; a deprecation notice about `rolldownOptions` in build logs is expected and harmless.)

- [ ] **Step 4: Build and verify the dist contract (CRITICAL GATE)**

```bash
npm run build
ls dist/index.js dist/index.umd.cjs dist/index.d.ts
find dist/stories -type d | wc -l        # expect 1 (flat)
ls dist/stories/ | wc -l                  # expect same count as Task 1 baseline
head -5 dist/stories/*.story.tsx | grep -m1 "from 'reaviz'"   # stories.cjs rewrote paths
grep -c "from 'd3-" dist/index.js         # expect >0 (deps still externalized, not inlined)
ls dist/blocks/
```

Expected: all three index files exist; `dist/stories/` flat with the baseline file count; imports rewritten to `'reaviz'`; d3 imports external.

**ABORT CONDITION:** if `dist/index.umd.cjs` is NOT produced (UMD retention under Rolldown is inferred, not documented), first try adding explicit formats in `vite.config.ts` `build.lib`:

```ts
        lib: {
          entry: resolve('src', 'index.ts'),
          name: 'reaviz',
          fileName: 'index',
          formats: ['es', 'umd']
        },
```

If Vite 8 errors on `'umd'`, **revert this entire task** (`git checkout -- package.json package-lock.json vite.config.ts && npm ci`), pin `vite@^7.3.5`, and move Vite 8 to the Deferred table — the `exports.require → dist/index.umd.cjs` contract must not break a published package.

- [ ] **Step 5: Full verification**

```bash
npm run ts:check && npm run lint && npm run test:ci && npm run build-storybook
```

Expected: all exit 0 (vitest 4.1.8 runs on vite 8; storybook builder on vite 8).

- [ ] **Step 6: Visual regression check (Rolldown/Oxc transform differences)**

```bash
npm start &
sleep 30 && npm run test-storybook
kill %1
```

Expected: snapshots unchanged. This is the main guard against subtle CJS-interop/transform differences in the d3/chroma dependency graph under Rolldown.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts
git commit -m "Update to Vite 8 with plugin majors; preserve flat stories output and unminified CSS"
```

---

### Task 10: Final sweep + deferred ledger

**Files:**
- Modify: `CHANGELOG.md` (if the repo maintains one — check first; otherwise skip)

- [ ] **Step 1: Confirm the only remaining outdated packages are the intentional deferrals**

```bash
npm outdated
```

Expected output contains ONLY:
- `eslint` 9.39.4 → 10.4.1 (blocked: eslint-plugin-react #3977)
- `@eslint/js` 9.39.4 → 10.0.1 (lockstep with eslint)
- `vite-plugin-dts` 4.5.4 → 5.0.2 (intentional: TS 6 / api-extractor)

Anything else listed = a missed upgrade; investigate.

- [ ] **Step 2: Full CI-equivalent pipeline, one last time**

```bash
npm ci && npm run lint && npm run build && npm run build-storybook && npm run test:ci
```

Expected: all exit 0 (this mirrors `.github/workflows/build.yml` exactly, including the `npm ci` lockfile replay that npm-publish.yml depends on).

- [ ] **Step 3: Audit check (informational)**

```bash
npm audit --omit=dev || true
```

Expected: 0 vulnerabilities in runtime deps. Dev-dep advisories: note but don't block.

- [ ] **Step 4: Push and open PR**

```bash
git push -u origin deps/upgrade-all-2026-06
gh pr create --title "Upgrade all dependencies to latest (Node 22 floor, React 19 dev env, TS 6, Vite 8, Storybook 10.4)" --body "$(cat <<'EOF'
## Summary
- Raise Node engines floor to >=22.12.0 (already required by reablocks/vitest; CI reads engines via node-version-file)
- All runtime deps now latest (ellipsize 0.7); published peerDependencies unchanged (react >=16 still valid)
- Dev env: React 19.2 (+5 useRef/1 wrapText type fixes), TypeScript 6.0 (explicit strict:false), Vite 8 (Rolldown; flat dist/stories preserved via stripBase; cssMinify pinned off), Storybook 10.4.2, jsdom 29, eslint-plugin-react-hooks 7
- Removed deprecated @types/classnames stub

## Deferred (with reasons)
- eslint 10 + @eslint/js 10: blocked by eslint-plugin-react (jsx-eslint/eslint-plugin-react#3977)
- vite-plugin-dts 5: unplugin-dts/api-extractor not TS-6 ready; v4.5.4 peers vite/typescript '*'
- overrides.uuid stays ^11 (dedupe for @storybook/test-runner's jest-junit)

## Verification
- npm run lint / ts:check / build / build-storybook / test:ci all green at every commit
- dist contract verified: index.js + index.umd.cjs + index.d.ts emitted, dist/stories flat, deps externalized
- test-storybook visual snapshots unchanged after React 19 and Vite 8

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Execution notes

- **Sequencing is load-bearing**: Task 2 (Node floor) gates 5/8/9; tsconfig edits in Task 8 must land *before* `typescript@6` installs or build/dev break via vite-plugin-checker; the static-copy `rename` fix in Task 9 must land in the same commit as the v4 bump.
- **Every task commits `package-lock.json`** — npm-publish.yml runs `npm ci` and will fail on a stale lockfile.
- If any verification step fails in a way not covered by a contingency here, STOP and investigate (superpowers:systematic-debugging) rather than stacking more upgrades on a red state.
