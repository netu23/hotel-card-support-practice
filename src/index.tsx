import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

function isStackBlitzPreview(): boolean {
  return window.location.hostname.endsWith(".webcontainer.io");
}

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (isStackBlitzPreview()) {
    const { installFetchFallback } = await import("./mocks/fetchFallback");
    installFetchFallback();
    return;
  }

  try {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  } catch (error) {
    console.warn("MSW worker failed to start. Using fetch fallback.", error);

    const { installFetchFallback } = await import("./mocks/fetchFallback");
    installFetchFallback();
  }
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
