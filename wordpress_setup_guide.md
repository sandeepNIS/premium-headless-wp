# Headless WordPress & Next.js: Definitive Setup Guide

This guide outlines the critical steps to maintain and extend your headless architecture.

## 🛠 WordPress Configuration

### 1. General Settings
- **Permalinks**: Must be set to **Post name**. Without this, the Next.js slug-based routing will fail (resulting in 404s).

### 2. Advanced Custom Fields (ACF)
For any Custom Post Type, Taxonomy, or Field Group:
- **Show in REST API**: This **MUST** be toggled to **Yes** in the settings.
- If you add new fields, ensure the Field Group is active and assigned to the correct location.

### 3. Custom Post Types (e.g., Projects)
- **Key**: Keep it lowercase (e.g., `project`).
- **REST API Base**: Standard is the plural form (e.g., `projects`) or the key itself.
- **Support**: Enable `Title`, `Editor`, `Featured Image`, and `Excerpt`.

### 4. Contact Form 7
- **Form ID**: Every form has a unique numeric ID (found in the shortcode `id="123"`).
- **REST API**: CF7 provides `/wp-json/contact-form-7/v1/contact-forms/{id}/feedback` automatically.

---

## 🚀 Next.js Configuration

### 1. Environment Variables (`.env.local`)
Always ensure these are correctly pointed to your local or staging WP instance:
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/headless/wp-json/wp/v2
NEXT_PUBLIC_CF7_ID=15
```

### 2. Data Fetching (`src/lib/api.ts`)
- Use the `fetchAPI` wrapper for consistent error handling and revalidation.
- When adding a new post type, create a corresponding `get[Type]` and `get[Type]BySlug` function.

### 3. Handling 404 Errors
If a page isn't loading:
1. **Flush Permalinks**: Save the permalinks page in WordPress.
2. **Check Endpoint**: Visit `[WP_URL]/wp-json/wp/v2/[slug]` in your browser to see if data exists.
3. **Verify API Base**: Double-check if the endpoint is singular or plural (e.g., `/project` vs `/projects`).

---

## 🎨 Design system
- **Tailwind v4**: All styling is handled in `src/app/globals.css` using the `@theme` block.
- **Glassmorphism**: Use `bg-white/5 backdrop-blur-xl border-white/10` for the premium feel.
- **Mobile Sidebar**: The header uses a client-side state (`isOpen`) for the drawer menu below 990px.
