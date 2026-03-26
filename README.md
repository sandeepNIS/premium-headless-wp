# Headless WordPress with Next.js & Tailwind CSS

A premium, high-performance headless CMS frontend built with **Next.js 16** and **Tailwind CSS v4**, powered by the **WordPress REST API**.

## 🚀 Key Features

- **Tailwind v4 Architecture**: Leveraging the latest CSS-first configuration and @theme blocks for ultimate performance.
- **Dynamic Routing**: Automatic generation of Post, Category, and Static Page routes from WordPress content.
- **Premium Design System**:
  - **Home**: Interactive hero with animated gradients and insights grid.
  - **About**: Custom storytelling layout with mission-driven design.
  - **Contact**: Fully integrated **Contact Form 7** submission handler with modern React UI.
- **Mobile First**: Responsive sidebar navigation designed for screens below 990px.
- **Headless Optimized**: Centralized API utility with revalidation (ISR) for blazing-fast performance.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data**: WordPress REST API
- **Forms**: Contact Form 7 (Submission via REST API)

## ⚙️ Configuration

Create a `.env.local` file in the root directory and add the following:

```bash
# Your WordPress JSON API URL
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/headless/wp-json/wp-json/wp/v2

# Optional: Your Contact Form 7 ID (defaults to 1 if not set)
NEXT_PUBLIC_CF7_ID="15"
```

> [!IMPORTANT]
> Ensure your WordPress instance has **Permalinks** set to `Post name` for correct slug-based routing.

## 🏃 Getting Started

1.  **Clone the project**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Open the app**: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

- `src/app/`: Next.js pages and layouts (About, Contact, Categories, Posts).
- `src/components/`: Reusable UI modules (Header, Footer, PostCard, ContactForm).
- `src/lib/api.ts`: Centralized WordPress API fetching logic.
- `src/app/globals.css`: Tailwind v4 theme and global styles.

## 📝 License

This project is open-source and ready for your next premium headless venture.
