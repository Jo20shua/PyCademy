import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pycademy-python-learning-platform.jsx";
import "./styles.css";

window.storage = window.storage || {
  async get(key) {
    const value = window.localStorage.getItem(key);
    return value === null ? null : { value };
  },
  async set(key, value) {
    window.localStorage.setItem(key, value);
    return { value };
  },
  async delete(key) {
    window.localStorage.removeItem(key);
  },
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
