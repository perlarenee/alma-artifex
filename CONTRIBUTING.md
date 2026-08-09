# Contributing Guide

This repository is both a working portfolio app and a reusable starter pattern for building profile-style applications.

## Project Philosophy

Contributions should:

- keep the app polished and easy to understand
- preserve the current content-driven architecture
- improve the profile experience without unnecessary complexity
- make future cloud and multi-user evolution easier

## Branching Strategy

- `main`: stable, review-ready work
- feature branches: use descriptive names such as `feat/contact-api` or `fix/profile-section-spacing`
- keep branches focused and merge them promptly

## Development Workflow

1. install dependencies with `pnpm install`
2. start the app locally with `pnpm dev`
3. make focused changes
4. run the project checks before submitting work

## Commit Conventions

This project uses Conventional Commits.

Examples:

```bash
feat(ui): add reusable reveal-on-scroll helper
fix(contact): improve form validation behavior
docs(readme): refresh GitHub project overview
```

## Code Style and Formatting

This repository uses Biome and Ultracite.

Before submitting changes, make sure formatting and checks are clean.

```bash
pnpm check:prepush
```

## Content and Data Guidelines

The app is currently driven by placeholder profile data in [src/data/profile.ts](src/data/profile.ts).

When making changes:

- keep the profile data structure consistent with [src/data/types.ts](src/data/types.ts)
- avoid hard-coding personal data into components unless it is intentionally meant to be sample content
- preserve the ability to swap static placeholder content for real backend content later

## Component and UI Guidelines

- prefer reusable UI components over one-off page logic
- keep sections composable and easy to rearrange
- preserve responsive behavior across screen sizes
- keep the visual language consistent with the current theme

## Testing Expectations

- add or update tests for logic-heavy utility changes
- keep tests focused and meaningful
- use the existing Vitest setup

## Pull Request Checklist

Before opening a PR, confirm that:

- the app still builds locally
- tests are passing
- formatting and checks pass
- documentation reflects meaningful changes
- the change fits the overall profile-app direction of the repository

- [ ] Code follows style guidelines
- [ ] Tests pass and coverage is adequate
- [ ] TypeScript compiles without errors
- [ ] No breaking changes (or clearly documented)
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventions

## Dependency Management

### Adding Dependencies

```bash
# Production dependency
pnpm add <package>

# Development dependency
pnpm add -D <package>
```

### Updating Dependencies

```bash
# Interactive update
pnpm up-interactive

# Update to latest
pnpm up-latest
```

### Dependency Philosophy

- Prefer minimal dependencies
- Use established, well-maintained packages
- Document why non-obvious dependencies are needed

## Known Pitfalls

### Route Tree Generation

- Do not manually edit `src/routeTree.gen.ts`
- Route tree regenerates on file save during development
- If routes don't appear, check file naming and `createFileRoute` usage

### TypeScript Path Aliases

- Path aliases work in source code, not in config files
- Use relative paths in `vite.config.ts`, `vitest.config.ts`, etc.

### Biome Exclusions

Some files are excluded from Biome checks (see `biome.json`):
- Generated files (`*.gen.ts`)
- UI component library files (`src/lib/components/ui/**/*`)
- Type definition files (`*.d.ts`)

## Questions?

If you're unsure about a contribution approach:
1. Check existing code for patterns
2. Review this guide and related documentation
3. Open an issue for discussion before large changes

