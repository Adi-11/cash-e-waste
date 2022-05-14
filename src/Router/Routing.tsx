import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin } from "../components/Admin/Admin";
import CreateNewWallet from "../components/CreateNewWallet";
import { Home } from "../components/Home";
import { Login } from "../components/Login";
import { PickUp } from "../components/Pickup/PickUp";
import { Profile } from "../components/Profile";
import { Schedule } from "../components/Schedule";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/createNewWallet" element={<CreateNewWallet />} />
      <Route path="/pickup" element={<PickUp />} />
    </Routes>
  );
};
