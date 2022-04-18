import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin } from "../components/Admin";
import { Header } from "../components/Header";
import { Home } from "../components/Home";
import { Login } from "../components/Login";
import { Schedule } from "../components/Schedule";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
};
