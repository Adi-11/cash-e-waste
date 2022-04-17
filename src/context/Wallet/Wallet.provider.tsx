import { useSnackbar } from "notistack";
import React, { createContext, useContext } from "react";
import { backendUrl } from "../../config";
import AuthContext from "../Authentication/Auth.provider";

const WalletContext = createContext({});

export default WalletContext;

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const connectToNewWallet = async () => {
    await fetch(`${backendUrl}/users/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          enqueueSnackbar("Wallet created successfully", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const connectToExistingWallet = async (phrase: string) => {
    let body = {
      phrase,
    };
    await fetch(`${backendUrl}/users/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          enqueueSnackbar("Wallet connected successfully", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const disConnectWallet = async () => {
    await fetch(`${backendUrl}/users/disconnect`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          enqueueSnackbar("Wallet disconnected successfully", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const getBalance = async () => {
    await fetch(`${backendUrl}/users/balance`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.message);
        } else {
          // do something with the balance
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <WalletContext.Provider
      value={
        {
          connectToNewWallet,
          connectToExistingWallet,
          disConnectWallet,
          getBalance,
        } as any
      }
    >
      {children}
    </WalletContext.Provider>
  );
};