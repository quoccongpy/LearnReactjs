import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./features/auth/context/AuthProvider.jsx";
import { NotificationProvider } from "./features/notification/context/NotificationProvider.jsx";
import { Provider } from "react-redux";
import store from "./core/store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
