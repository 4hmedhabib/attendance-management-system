import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

const queryClient = new QueryClient();

export const generalToastifyStyle = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  closeButton: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastContainer {...generalToastifyStyle} />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

serviceWorker.unregister();
