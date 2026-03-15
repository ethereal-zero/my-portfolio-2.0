import "./App.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./store/ThemeStore";
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";

function App() {
  return (
    <ThemeProvider>
      {/* Fixed blob background */}
      <div aria-hidden className="blob-bg pointer-events-none">
        <div className="orbit orbit-1"><div className="blob blob-1" /></div>
        <div className="orbit orbit-2"><div className="blob blob-2" /></div>
        <div className="orbit orbit-3"><div className="blob blob-3" /></div>
        <div className="blob-vignette" />
      </div>

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="relative z-10 min-h-screen">
        <NavHeader />
        <main>
          <div id="home">
            <HeroSection />
          </div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="projects">
            <ProjectSection />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
