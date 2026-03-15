import "./App.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./store/ThemeStore";
import NavHeader from "./components/NavHeader";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HeroSectionContent from "./components/HeroSectionContent";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";

function App() {
  return (
    <ThemeProvider className="relative">
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

        <div className="relative z-10 flex w-full flex-col">
          <NavHeader />

          <main>
            <section id="home">
              <HeroSection />
              <HeroSectionContent />
            </section>

            <section id="about">
              <AboutSection />
            </section>

            <section id="projects">
              <ProjectSection />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
