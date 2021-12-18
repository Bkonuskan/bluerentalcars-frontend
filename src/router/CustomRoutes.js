import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ReservationEditPage from "../pages/admin/ReservationEditPage";
import ReservationsPage from "../pages/admin/ReservationsPage";
import UserEditPage from "../pages/admin/UserEditPage";
import UsersNewPage from "../pages/admin/UsersNewPage";
import UsersPage from "../pages/admin/UsersPage";
import VehiclesEditPage from "../pages/admin/VehiclesEditPage";
import VehiclesNewPage from "../pages/admin/VehiclesNewPage";
import VehiclesPage from "../pages/admin/VehiclesPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import RegisterPage from "../pages/RegisterPage";
import ServicesPage from "../pages/ServicesPage";
import ProfilePage from "../pages/user/ProfilePage";
import UserReservationDetailPage from "../pages/user/UserReservationDetailPage";
import UserReservationsPage from "../pages/user/UserReservationsPage";
import PrivateRoute from "./PrivateRoute";

const CustomRoutes = () => {
  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route path="/admin/users" element={<PrivateRoute admin={true}><UsersPage/></PrivateRoute>}/>
      <Route path="/admin/users/new" element={<PrivateRoute admin={true}><UsersNewPage/></PrivateRoute>}/>
      <Route path="/admin/users/:userId" element={<PrivateRoute admin={true}><UserEditPage/></PrivateRoute>}/>

      <Route path="/admin/vehicles" element={<PrivateRoute admin={true}><VehiclesPage/></PrivateRoute>}/>
      <Route path="/admin/vehicles/new" element={<PrivateRoute admin={true}><VehiclesNewPage/></PrivateRoute>}/>
      <Route path="/admin/vehicles/:vehicleId" element={<PrivateRoute admin={true}><VehiclesEditPage/></PrivateRoute>}/>

      <Route path="/admin/reservations" element={<PrivateRoute admin={true}><ReservationsPage/></PrivateRoute>}/>
      <Route path="/admin/reservations/:reservationId" element={<PrivateRoute admin={true}><ReservationEditPage/></PrivateRoute>}/>

      {/* CUSTOMER ROUTES */}
      <Route path="/reservations/:reservationId" element={<PrivateRoute><UserReservationDetailPage/></PrivateRoute>}/>
      <Route path="/reservations" element={<PrivateRoute><UserReservationsPage/></PrivateRoute>}/>
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      
      {/* VISITOR ROUTES */}
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default CustomRoutes;
