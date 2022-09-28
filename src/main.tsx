import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { RoutesProvider } from "./routes";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Suspense
      fallback={
        <p className="my-3 h-full text-center text-3xl font-bold tracking-tight">
          Loading...
        </p>
      }
    >
      <RoutesProvider />
    </Suspense>
  </Provider>
);
