import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import ContextProvider from "./app/context/ContextProvider";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { store } from "./app/store";
import theme from "./app/MaterialTheme";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./app/context/SocketContext";

const container = document.getElementById('root')!;
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ContextProvider>
                <SocketProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                            <App/>
                    </ThemeProvider>
                </BrowserRouter>
                </SocketProvider>
            </ContextProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();