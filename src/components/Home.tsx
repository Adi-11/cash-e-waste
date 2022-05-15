import React, { useContext } from "react";
import { FaTruckPickup } from "react-icons/fa";
import Lottie from "react-lottie";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Authentication/Auth.provider";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { token } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center lg:px-14 md:p-8 sm:p-4">
        <div className="shadow-slate-500 rounded-md m-auto flex items-center justify-between flex-col lg:flex-row">
          <div className="flex-[0.5] text-center lg:text-left h-full rounded-tl-md rounded-bl-md p-4">
            <p className="text-[3rem] font-bold text-primary">Cash-e-Waste</p>
            <p className="text-[2rem] font-semibold text-secondary-dark opacity-80">
              Convert your e-Waste to crpyto coins
            </p>
            <button
              className={"btn-schedule"}
              onClick={() => {
                token === "" ? navigate("/login") : navigate("/pickup");
              }}
            >
              Sechedule your pickup{" "}
              <FaTruckPickup size={20} className={"loader"} />
            </button>
          </div>
          <div className="flex-[0.5] h-full rounded-tl-md rounded-bl-md p-4">
            <Lottie
              options={{
                animationData: require(`../assets/city.json`),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
