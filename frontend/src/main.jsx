import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextApi from "./context/ContextApi"; // ✅ Ensure Correct Import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextApi> {/* ✅ Wrapping App with Context */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextApi>
  </StrictMode>
);
