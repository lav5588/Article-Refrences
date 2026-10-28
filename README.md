# Article References

A curated, categorized catalog of engineering articles, repository blueprints, and documentation guides styled with a high-contrast **Midnight Cyber** theme (Midnight Black, Electric Cobalt Blue, and Acid Lime).

🌐 **Live Website:** [https://lav5588.github.io/Article-Refrences/](https://lav5588.github.io/Article-Refrences/)

---

## 🚀 Features

- **⚡ 2-Column Responsive Layout:** Sticky category navigation on the left with dynamic item counts, and reference cards on the right.
- **🔤 Alphabetical Ordering by Default:** Categories and article headings are automatically sorted alphabetically from A to Z.
- **🔍 Real-Time Search:** Instant filtering within the active category by title, description, or URL domain.
- **📏 Zero Layout Shifts:** Fixed card heights (`h-[270px]`) with clamped typography and pinned action footers.
- **🎨 Tailwind CSS v4 & `cn` Utility:** Modern utility-first styling with `@tailwindcss/vite` and `tailwind-merge`.
- **🤖 Automated GitHub Pages Deployment:** Continuous deployment powered by GitHub Actions on every push to `main`.

---

## 📖 Adding New References

To add or update references, you only need to edit [`src/data.ts`](src/data.ts):

```typescript
export const data: CategoryGroup[] = [
  {
    category: 'Your Category Name',
    links: [
      {
        link: 'https://...',
        title: 'Article Title',
        short_description: 'Concise summary of the article...'
      }
    ]
  }
];
```

The application automatically sorts, indexes, filters, and renders newly added categories and references on the fly.

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🚢 GitHub Pages Deployment

This repository is configured for automatic deployment using GitHub Actions:

- **Workflow:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Vite Base Path:** Configured as `base: '/Article-Refrences/'` in [`vite.config.ts`](vite.config.ts).
- **Setup in GitHub:**
  1. Go to repository **Settings** &rarr; **Pages**.
  2. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
  3. Every push to the `main` branch will automatically build and publish the site.
