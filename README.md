# Alma Artifex

Alma Artifex is a professional profile app designed to present a person's experience, credentials, work history, testimonials, video introductions, and contact options in a streamlined single-page experience.

This repository is currently set up as a personal professional bio with placeholder data. The goal is to provide a clean, flexible, and visually strong showcase for a skilled professional while keeping the implementation simple enough to use as a template or starter for others.

## What this app is

Alma Artifex is meant to serve as:

- a personal professional bio / portfolio page
- a reusable profile template for other professionals
- a starting point for a future multi-user platform that can support many profiles from a shared backend

The current version uses static placeholder data and is optimized for a GitHub-hosted showcase and future cloud deployment.

## What it includes

The current UI includes:

- a hero/profile section with name, title, location, pronouns, and contact links
- a short bio and long bio area
- a work history timeline
- education and credentials sections
- testimonials cards
- embedded video content support
- a contact form experience
- reusable UI patterns for headings, sections, and reveal-on-scroll behavior

## Why this exists

This project was created as a more human-centered alternative to a social feed or generic resume. It gives a professional a place to present their work in a story-like format: who they are, what they have done, what they are known for, and how someone can reach them.

The app is intentionally designed to be easy to customize with new profile data and eventually to evolve into a backend-driven system.

## Tech stack

The app is built with:

- React 19
- TypeScript
- Vite
- Chakra UI v3
- TanStack Router
- TanStack Query
- Formik + Yup
- Vitest
- Biome + Ultracite
- pnpm

## Repository origin

This project was branched from a Vite + React + Chakra UI starter template and then adapted into a profile-site application.

In other words, the repo began as a general frontend starter and was transformed into a purpose-built professional profile experience.

## How to run locally

1. Install dependencies

```bash
pnpm install
```

2. Start the development server

```bash
pnpm dev
```

3. Build for production

```bash
pnpm build
```

## How to use it

The current placeholder content lives in:

- [src/data/profile.ts](src/data/profile.ts)
- [src/data/types.ts](src/data/types.ts)

To personalize the app, replace the sample profile data with your own name, title, bio, work history, testimonials, and contact details. Select a color scheme that suites your preferences.

## Current state and roadmap

### Current state

- static placeholder data
- fully functional UI experience
- responsive sections and reusable components
- contact form front-end experience

## About the name

Alma is Latin for “soul,” “nourishing,” or “kind,” inspired by the idea of Alma Mater.

Artifex is Latin for “artist,” “craftsperson,” or “maker.”

Together, the name reflects a human-centered, craft-driven professional identity.



