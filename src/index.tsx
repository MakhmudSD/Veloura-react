import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./app/MaterialTheme";
import ContextProvider from "./app/context/ContextProvider";

const container =   document.getElementById("root")!; // real dom
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider> 
      </Router>
      </ContextProvider>
    </Provider>
  </React.StrictMode>, // virtual dom
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
