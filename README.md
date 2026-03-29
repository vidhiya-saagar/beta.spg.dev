# SPG Wireframes - Astro

## Description

This is a repo for a "new"-er SPG website, that you can see on https://beta.spg.dev/books.

This one is built using Astro!

### Why Astro?

The reason we chose Astro is because this app is highly static. The whole application is based on a book (the Suraj Prakash Granth), which lives in a database. The contents of that data isn't really going to change. Meaning, when someone loads `/chapters/123`, it should always load the same page.

And Astro is very good at optimizing these things because it will BUILD these pages in our deployment.

## Getting Started

### Pre-requisites

- Clone and setup [spg2](https://github.com/vidhiya-saagar/spg2) and `rails s` in that repo
- Clone this repo
- Install Node `v22` (e.g. `nvm install 22`)
- Run `yarn install`

### Running Astro Server

Once you have the Rails server running, do:

```
yarn run dev
```

This should open the server on http://localhost:4321/books

## Build Pipeline

### How Astro builds the site

When you run `yarn run build`, Astro performs a **static site generation (SSG)** pass — it renders every page ahead of time and outputs plain HTML files to `./dist/`. This means users get fast, pre-built HTML rather than waiting for server-side rendering on each request.

**How pages are generated:**

- **`/books` and `/chapters/[id]`** — Astro calls `getStaticPaths()` at build time, which fetches all chapters from the local Rails API (`API_URL`). Each chapter becomes its own pre-rendered HTML file under `dist/chapters/`.
- **`/blog` and `/blog/[slug]`** — Astro calls `getStaticPaths()` at build time, which fetches all blog entries from **Contentful** (a headless CMS) using the `CMS_SPACE_ID` and `CMS_ACCESS_TOKEN` credentials. Each blog post becomes its own HTML file under `dist/blog/`. The blog index page also fetches from Contentful to list all posts.

In short: **both the Rails API and Contentful must be reachable at build time**, or the build will fail. In local dev (`yarn run dev`), these fetches happen on-demand per request instead of all at once.

### Contentful

Blog content lives in Contentful as entries of content type `page`. Each entry has a slug, title, rich-text body, artwork, category, and meta description. The Contentful client is initialized in `src/helpers/contentful.js` using the env vars below.

## Deployment

This app uses Vercel to deploy over [here](https://vercel.com/is-null/wireframes-astro). For some reason, the Project is named `is-null`. I don't know why, but we should fix that soon lol.

Once something is merged, it automatically deploys with Vercel. Ensure we have all the appropriate `env`s set up in the Vercel project settings:

### ENVs

```env
# Local Rails API (spg2) — use the production URL on Vercel
API_URL=http://localhost:1843/

# Contentful CMS — required for /blog pages to build
CMS_SPACE_ID=
CMS_ACCESS_TOKEN=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Copy `.env` from this template and fill in the values. The `.env` file is gitignored.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `yarn install`          | Installs dependencies                            |
| `yarn run dev`          | Starts local dev server at `localhost:3000`      |
| `yarn run build`        | Build your production site to `./dist/`          |
| `yarn run preview`      | Preview your build locally, before deploying     |
| `yarn run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `yarn run astro --help` | Get help using the Astro CLI                     |
