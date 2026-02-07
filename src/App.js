import "./App.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./store/ThemeStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavHeader from "./components/NavHeader";

// Auto-load all page components from src/pages (and subfolders)
const pagesContext = require.context("./pages", true, /\.(js|jsx|ts|tsx)$/);

function fileToRoute(file) {
  // "./index.jsx" -> "index"
  // "./about-us.jsx" -> "about-us"
  // "./blog/PostDetails.jsx" -> "blog/PostDetails"
  const name = file.replace(/^\.\/|(\.js|\.jsx|\.ts|\.tsx)$/g, "");

  // Choose what becomes "/"
  if (/^(index|home)$/i.test(name)) return "/";

  // Convert "/blog/PostDetails" -> "/blog/post-details"
  return (
    "/" +
    name
      .replace(/\/index$/i, "") // blog/index => blog
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
  );
}

const pageRoutes = pagesContext
  .keys()
  .map((file) => {
    const mod = pagesContext(file);
    const Component = mod?.default;
    if (!Component) return null;

    return {
      path: fileToRoute(file),
      Component,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.path === "/" ? -1 : b.path === "/" ? 1 : a.path.localeCompare(b.path)));

function App() {
  return (
    <ThemeProvider className="relative">
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <section className="relative flex min-h-dvh flex-col bg-black/50 z-10">
          <NavHeader />
          <Routes>
            {pageRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
