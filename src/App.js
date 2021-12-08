import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser } from "./api/user-service";
import { getVehicles } from "./api/vehicle-service";
import Footer from "./components/common/Footer";
import MenuBar from "./components/common/MenuBar";
import TopBar from "./components/common/TopBar";
import CustomRoutes from "./router/CustomRoutes";
import { useStore } from "./store";
import { loginSuccess } from "./store/user/userActions";
import { setVehiclesInStore } from "./store/vehicles/vehiclesActions";

const App = () => {
  const { dispatchUser, dispatchVehicles } = useStore();

  const loadData = async () => {
    try {
      /**** LOAD USER ****/
      const respUser = await getUser();
      if (respUser.status !== 200) throw "An error occured whlie getting user";
      dispatchUser(loginSuccess(respUser.data));

      /**** LOAD VEHICLES ****/
      const respVehicles = await getVehicles();
      if(respVehicles.status !==200) throw "An error occured whlie getting vehicles";
      dispatchVehicles(setVehiclesInStore(respVehicles.data));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
