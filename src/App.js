import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser } from "./api/user-service";
import { getVehicles } from "./api/vehicle-service";
import Footer from "./components/common/Footer";
import MenuBar from "./components/common/MenuBar";
import TopBar from "./components/common/TopBar";
import LoadingPage from "./pages/LoadingPage";
import CustomRoutes from "./router/CustomRoutes";
import { useStore } from "./store";
import { loginSuccess } from "./store/user/userActions";
import { setVehiclesInStore } from "./store/vehicles/vehiclesActions";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { dispatchUser, dispatchVehicles } = useStore();

  const loadData = async () => {
 
    try {

      /**** LOAD VEHICLES ****/
      const respVehicles = await getVehicles();
      if(respVehicles.status !==200) throw "An error occured whlie getting vehicles";
      dispatchVehicles(setVehiclesInStore(respVehicles.data));
      


      /**** LOAD USER ****/
      const respUser = await getUser();
      if (respUser.status !== 200) throw "An error occured whlie getting user";
      dispatchUser(loginSuccess(respUser.data));

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if(loading) return(<LoadingPage/>)
  else
  return (
    <BrowserRouter>
      <TopBar />
      <MenuBar />
      <CustomRoutes />
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  )
};

export default App;
