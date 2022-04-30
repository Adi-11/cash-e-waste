import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/Authentication/Auth.provider";
import { ProductsProvider } from "./context/Products/Products.provider";
import { WalletProvider } from "./context/Wallet/Wallet.provider";
import { Routing } from "./Router/Routing";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AuthProvider>
          <WalletProvider>
            <ProductsProvider>
              <Routing />
            </ProductsProvider>
          </WalletProvider>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
