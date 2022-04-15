import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Login } from "../components/Login";

interface RoutingProps {}

export const Routing: React.FC<RoutingProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
