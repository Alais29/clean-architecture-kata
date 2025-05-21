// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import ReactView from "./users/presentation/ReactView";

const App = () => {
  return <ReactView />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
