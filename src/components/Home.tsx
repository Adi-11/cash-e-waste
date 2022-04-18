import React from "react";
import { FaTruckPickup } from "react-icons/fa";
import Lottie from "react-lottie";
import { Header } from "./Header";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center px-14 ">
        <div className="shadow-slate-500 rounded-md m-auto flex items-center justify-between">
          <div className="flex-[0.5] h-full rounded-tl-md rounded-bl-md p-4">
            <p className="text-[3rem] font-bold text-primary">Cash-e-Waste</p>
            <p className="text-[2rem] font-semibold text-secondary-dark opacity-80">
              Convert your e-Waste to cryto coins
            </p>
            <button className={"btn-schedule"}>
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
