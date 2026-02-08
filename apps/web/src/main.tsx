import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const enableMocks = async () => {
  if (import.meta.env.DEV) {
    const { setupWorker } = await import("msw/browser");
    const { handlers } = await import("@fantube/mocks");
    const worker = setupWorker(...handlers);
    await worker.start({ onUnhandledRequest: "bypass" });
  }
};

enableMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
