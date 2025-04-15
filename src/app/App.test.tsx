import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./MaterialTheme";
import App from "./App";
import ReactDOM from "react-dom";
import reportWebVitals from "../reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <App />
    </Provider>
  </React.StrictMode>,
  // eslint-disable-next-line testing-library/no-node-access
  document.getElementById("root")
);

reportWebVitals();
