import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import store, { persistor } from "@/store";

import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "@/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
