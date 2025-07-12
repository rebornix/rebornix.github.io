# Copilot Instructions for rebornix.github.io

This is a **Jekyll-based personal blog** using Jekyll Bootstrap framework, hosted on GitHub Pages. The blog features bilingual content (English/Chinese) with a focus on technology, AI, and software development.

## Project Architecture

### Core Structure
- **Jekyll Static Site**: Built using Jekyll Bootstrap 0.2.13 with custom layouts
- **Content Organization**: Blog posts in `_posts/` with YYYY-MM-DD-title.md naming convention
- **Layout System**: Custom layouts in `_layouts/` extending Jekyll Bootstrap patterns
- **Styling**: Single SCSS file at `stylesheets/main.scss` with CSS custom properties
- **Jekyll Bootstrap Integration**: Modular components in `_includes/JB/` for analytics, comments, tags

### Key Configuration
- **Base URL**: `http://www.rebornix.com` (production_url in `_config.yml`)
- **Permalink Structure**: `/:categories/:year/:month/:day/:title/`
- **Markdown Engine**: Kramdown with Rouge syntax highlighting
- **Comments**: Disqus integration via Jekyll Bootstrap helpers

## Content Patterns

### Blog Post Format
```yaml
---
layout: post
title: "Post Title"
category: [Work|Frontend|AI|snippets|海上日志]
description: "Optional meta description"
tags: []
---
{% include JB/setup %}
```

### Common Categories
- `Work` - Professional/career content
- `Frontend` - Web development topics  
- `AI` - AI/ML and technology insights
- `snippets` - Code samples and technical tips
- `海上日志` - Personal diary-style posts (Chinese)

### Content Style
- Mixed English/Chinese content with no strict language separation
- Technical posts often include code examples with syntax highlighting
- Personal reflections and industry analysis are common themes
- Product promotions for ProxMobo app embedded in post layout

## Development Workflow

### Creating Content
```bash
# Create new blog post
rake post title="Post Title" [date="2024-01-01"]

# Create new page
rake page name="page-name.html"

# Local development
rake preview  # Equivalent to jekyll --auto --server
```

### File Naming Conventions
- Posts: `YYYY-MM-DD-title-slug.md` in `_posts/`
- Chinese characters allowed in filenames and URLs
- Use hyphens for word separation in slugs

### Theme Management
The site uses a custom theme based on Jekyll Bootstrap:
```bash
# Switch themes (if multiple installed)
rake theme:switch name="theme-name"

# Install new theme
rake theme:install git="theme-repo-url"
```

## Styling Guidelines

### CSS Architecture
- **Single file approach**: All styles in `stylesheets/main.scss`
- **CSS Custom Properties**: Use `--font-sans`, `--text-color`, etc. for consistency
- **Typography**: JetBrains Mono as primary font with monospace fallbacks
- **Responsive**: Mobile-first approach with max-width container (680px)

### Visual Identity
- Minimalist design with clean typography
- Monospace font family throughout for distinctive look
- Consistent spacing using rem units
- Subtle borders and muted color palette

## Technical Constraints

### GitHub Pages Limitations
- Jekyll safe mode only (no custom plugins)
- Limited to Jekyll Bootstrap compatible themes
- Static asset compilation via Jekyll's built-in SCSS processor

### Deployment
- **Automatic**: Pushes to master branch trigger GitHub Pages rebuild
- **Custom Domain**: Configured via CNAME file and _config.yml
- **Analytics**: Plausible.io integration in layouts

## Content Guidelines

### Writing Style
- Professional but personal tone
- Technical accuracy with practical examples
- Bilingual support without language barriers
- Industry insights based on author's VS Code/Copilot experience

### SEO Optimization
- Use descriptive titles and meta descriptions
- Include relevant categories and tags
- Maintain consistent URL structure via permalinks
- Canonical URLs configured for production domain
