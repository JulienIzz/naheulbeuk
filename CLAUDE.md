# CLAUDE.md

## Project

Mobile audio streaming app for the _Donjon de Naheulbeuk_ audio saga. React Native + Expo 55 (managed), Yarn 4. Streams episodes, bonus content, songs, and soundboard clips from Cloudflare R2, with metadata stored in Supabase (Postgres).

## Scripts

```bash
yarn start              # Start Expo dev server
yarn test               # Run all checks (translations + jest + lint + types)
yarn test:claude        # Quick check: jest on changed files + lint --fix + types
yarn test:types         # TypeScript type checking
yarn test:lint          # ESLint, add --fix to auto-fix fixable issues
yarn test:unit          # Jest one shot all tests
yarn ios                # Build on iOS
yarn android            # Build on Android
```

**After making changes, always run `yarn test:claude` to validate.**

## External CLIs

```bash
npx wrangler             # Cloudflare R2 management (upload files, manage buckets)
supabase                 # Supabase CLI (run SQL, migrations, generate types)
```

**Wrangler R2**: wrangler is not a project dependency (removed to avoid native build failures on EAS). Use `npx wrangler` instead. Always use the `--remote` flag when interacting with R2 (e.g. `npx wrangler r2 object put ... --remote`). Without it, wrangler targets local emulation.

## Development workflow

**Testing**: run `yarn test:claude` after making changes to ensure types, linting, and tests pass locally before pushing

**Translations**: after adding or changing i18n strings, run `yarn translations:update` then fill in any missing English translations in `src/shared/i18n/locales/en/messages.po` (look for empty `msgstr ""` entries)

## Architecture

- **Navigation**: `expo-router` with Stack layout (root at `src/app/navigation/`)
- **Config**: `app.config.ts` with `STAGE` env var (dev/production). Runtime config via `appEnv` accessed through `expo-constants` — no `.env` for app secrets
- **Path aliases**: `#app/*`, `#modules/*`, `#shared/*`, `#testing/*`, `#design-system/*` (configured in `tsconfig.json`)
- **Design system**: theme tokens in `#design-system/theme` — colors, spacing, fontSizes, fontWeights, borderRadius. Styling via `@emotion/native` (`styled`). Use `({ theme }: { theme: DefaultTheme })` in styled components
- **Data flow**: Supabase (metadata) → TanStack Query (cache) → screens. Audio streamed directly from Cloudflare R2

## Code Conventions

- **Strict TypeScript**: `strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`
- **ESLint**: flat config with `@bam.tech/eslint-plugin`, zero warnings allowed
- **Prettier**: 80 char print width
- **Imports**: use path aliases (`#shared/appEnv`, `#modules/tracks/api/tracks.service`) — never relative paths crossing module boundaries
- **Module structure**: subdirectory-organized modules — `api/`, `types/`, `domain/`, `hooks/`, `components/`, `context/`, `mocks/`
- **Tests**: colocated with source files (`.test.tsx` next to component), use `jest-expo` preset
- **Test utilities**: use `renderWithProviders` from `#testing/render` for component tests
- **Snapshots**: use `toMatchComponentSnapshot` for components, `toMatchInlineSnapshot` otherwise — `toMatchSnapshot` is banned
- **Console**: tests fail on `console.warn`, `console.error`, `console.debug` via `jest-fail-on-console`
- **Fake timers**: always active in tests, mocked date and `Math.random` for reproducibility
- **Exports**: always use `export const`, never `export default function`. Exception: expo-router screen files require a default export
- **i18n**: Lingui.js 5.x with `useLingui()` macro from `@lingui/react/macro`. In components: `const { t } = useLingui()` then `` t`text` `` (tagged template). Source locale is `"fr"`. PO files in `src/shared/i18n/locales/{locale}/messages.po`. Run `yarn translations:update` after adding/changing strings

## Testing guidelines

- **Always use `renderWithProviders`** from `#testing/render` — never use `react-test-renderer` directly. `screen` supports `toJSON()` so `expect(screen).toMatchComponentSnapshot()` works
- **Enrich `renderWithProviders`** with any new providers (it already includes ThemeProvider + SafeAreaProvider + PlayerProvider) — don't wrap manually in each test
- **Error boundaries**: wrap data-fetching screens with `<QueryErrorBoundary>` from `#shared/QueryErrorBoundary` instead of raw `<Suspense>`
- **Keep tests simple**: render → assert with `screen`. No extra helpers or wrappers
- **Prefer `userEvent`** over `fireEvent` — never use `fireEvent` without asking first
- **Use `screen.getByX`** — don't destructure queries from the render result

## ESLint rules to remember

- **No inline styles**: use Emotion's `styled` from `@emotion/native`, never `style={{ }}`. For `contentContainerStyle` use `styled.X.attrs()`
- **Named effects**: `useEffect` callbacks must be named functions (`useEffect(function doThing() { ... })`)
- **No raw text**: whitespace between JSX expressions counts as raw text — use string concatenation
- **Strict equality**: always `===`/`!==`
- **Floating promises**: use `void` for fire-and-forget async calls
