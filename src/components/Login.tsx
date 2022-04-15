import { CircularProgress, Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import Lottie from "react-lottie";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../context/Authentication/Auth.provider";
import { validateEmail } from "../Helpers/validations";
import { useSnackbar } from "notistack";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [forLogin, setForLogin] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const { loading, isAuthenticated, token, userSignup, userLogin } =
    useContext<any>(AuthContext);
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleForLogin = () => {
    setForLogin(!forLogin);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (data.email === "" || data.password === "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return;
    }

    if (validateEmail(data.email) === null) {
      enqueueSnackbar("Please enter a valid email", { variant: "error" });
      return;
    }
  };

  return (
    <div className="container h-[70vh] mt-32 mx-auto shadow-2xl shadow-slate-500 bg-white rounded-md flex items-center justify-center">
      <div className="flex-[0.5] h-full bg-primary rounded-tl-md rounded-bl-md p-4">
        <div
          className={
            "flex items-center justify-center flex-col min-h-full h-3/4 w-3/4 m-auto"
          }
        >
          <p className="text-accent mt-4 text-3xl font-extrabold ">
            Cash-E-Waste
          </p>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require(`../assets/login.json`),
            }}
          />
        </div>
      </div>
      <div className="flex-[0.5] p-4">
        <div className="w-full h-full">
          {forLogin ? (
            <div className="text-center">
              <p className="font-bold text-3xl">Welcome Back</p>
              <p className={"text-lg text-semibold"}>Sign In to your account</p>
            </div>
          ) : (
            <></>
          )}

          <div className="m-auto w-3/4">
            <div
              className={
                "feild w-full flex items-start justify-center flex-col mb-6"
              }
            >
              <div className={"w-4/5 mb-2"}>
                <p>Email</p>
              </div>
              <input
                className={
                  "py-4 px-2 outline-none border border-black rounded-md text-black text-base w-full"
                }
                type="email"
                name="email"
                placeholder="Type in your email.."
                required
                onChange={onChange}
                value={data.email}
              />
            </div>
            <div
              className={"feild w-full flex items-start justify-start flex-col"}
            >
              <div className={"w-4/5 mb-2"}>
                <p>Password</p>
              </div>
              <input
                className={
                  "py-4 px-2 outline-none border border-black rounded-md text-black text-base w-full"
                }
                type="password"
                name="email"
                placeholder="Type in your password.."
                required
                onChange={onChange}
                value={data.password}
              />
            </div>
            <button
              className={"btn"}
              onClick={() => handleLogin()}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress
                  size={20}
                  color={"primary"}
                  className={"loader"}
                />
              )}
            </button>
          </div>
          <div className="m-auto mt-6">
            <Divider variant="inset" sx={{ borderBottomWidth: 2 }} />
          </div>
          <div className="m-auto w-3/4">
            <button
              className={"btn-google"}
              // onClick={() => handleLogin()}
              // disabled={loading}
            >
              Login with Google <FcGoogle size={25} className={"loader"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
