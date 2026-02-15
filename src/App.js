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
        <div className="relative min-h-dvh overflow-hidden bg-background/50">
          {/* Animated blob background */}
          <div aria-hidden className="blob-bg pointer-events-none fixed inset-0 overflow-hidden">
            <div className="orbit orbit-1">
              <div className="blob blob-1" />
            </div>

            <div className="orbit orbit-2">
              <div className="blob blob-2" />
            </div>

            <div className="orbit orbit-3">
              <div className="blob blob-3" />
            </div>

            <div className="blob-vignette" />
          </div>

          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          <section className="relative z-10 flex w-full h-dvh flex-col bg-transaparent overflow-y-auto">
            <NavHeader />
            <Routes className="min-h-screen">
              {pageRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </section>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
