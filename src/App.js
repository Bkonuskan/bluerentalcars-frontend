import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/common/Footer";
import MenuBar from "./components/common/MenuBar";
import TopBar from "./components/common/TopBar";
import CustomRoutes from "./router/CustomRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <TopBar />
      <MenuBar />
      <CustomRoutes />
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
