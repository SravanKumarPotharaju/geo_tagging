import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 

import { PlantsProvider } from "./context/PlantsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlantsProvider>
      <App />
    </PlantsProvider>
  </React.StrictMode>
);
