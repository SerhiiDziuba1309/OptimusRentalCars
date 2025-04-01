import React from "react";
import { Routes, Route } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage.jsx";
import CarDetailsPage from "../pages/CarDetailsPage.jsx";
import HomePage from "../pages/HomePage.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CarDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
