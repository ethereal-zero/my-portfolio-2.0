# My Portfolio 2.0

A modern, responsive developer portfolio built with React and Supabase.

🌐 **Live Site:** https://candia-portfolio-2-0.vercel.app/

---

## Overview

This portfolio highlights my work, technical skills, and projects in a clean and interactive interface.  
It is designed to be fast, scalable, and easy to maintain, with project content managed dynamically via Supabase.

---

## Features

- Responsive UI optimized for:
  - **Mobile:** 1 column
  - **Tablet/Medium:** 2 columns
  - **Desktop/Large:** 3 columns
- Client-side routing with `react-router-dom` (no full page reloads)
- Dynamic project listing fetched from Supabase
- Project cards with:
  - Cover image
  - Category label
  - Description
  - Route/path preview
- Loading skeletons and graceful empty/error states
- Supabase Storage support for project thumbnails

---

## Tech Stack

- **Frontend:** React (Create React App)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Backend / Data:** Supabase (Postgres + Storage)
- **Icons:** Font Awesome
- **Deployment:** Vercel

---

## Environment Variables

Create a local env file in project root:

- `.env.development.local` (for local dev)

```env
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
