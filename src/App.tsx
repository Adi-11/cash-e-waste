import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/Authentication/Auth.provider";
import { Routing } from "./Router/Routing";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AuthProvider>
          <Routing />
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
