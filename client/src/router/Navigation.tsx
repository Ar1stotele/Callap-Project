import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants";
import { PieChart } from "../pages/PieChart";
import { Home } from "../pages/Home";

export const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.CHART} element={<PieChart />} />
    </Routes>
  );
};
