import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import MenuBar from "./components/common/MenuBar";
import TopBar from "./components/common/TopBar";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";

const App = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <MenuBar />
      <Routes>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
