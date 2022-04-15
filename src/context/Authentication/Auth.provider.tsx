import { useSnackbar } from "notistack";
import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";
import { AuthReducer } from "./Auth.reducer";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

export interface AuthStateType {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  token: string;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
  loading: false,
  user: null,
  token: "",
};

const AuthContext = createContext(initialState);

export default AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userLogin = async (
    data: { email: string; password: string },
    auth: any
  ) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        handleFirebaseResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
  };

  const userSignup = async (
    data: { email: string; password: string },
    auth: any
  ) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        handleFirebaseResponse(res);
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
  };

  const handleFirebaseResponse = (res: UserCredential) => {
    res.user.getIdTokenResult().then(async (token) => {
      console.log(token.token);
      await firebaseLogin(token.token);
    });
  };

  const firebaseLogin = async (token: string) => {
    return fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.msg);
        }
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        dispatch({
          type: "LOGIN",
          payload: { user: res.user, token: res.token },
        });
        enqueueSnackbar("Login successful", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar(err.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={
        {
          ...state,
          userLogin,
          userSignup,
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
