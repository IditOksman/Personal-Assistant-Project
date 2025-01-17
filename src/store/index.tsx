// src/index.ts
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "../App";

// This creates a root element:
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// This renders your React app into the DOM:
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
