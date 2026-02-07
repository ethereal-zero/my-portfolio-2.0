import logo from "./logo.svg";
import "./App.css";
import ColorThemeEditor from "./components/ColorThemeEditor";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./store/ThemeStore";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          {/* ✅ put your editor here */}
          <div style={{ marginTop: 24 }}>
            <ColorThemeEditor />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
