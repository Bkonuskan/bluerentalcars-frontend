import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import UsersNewPage from "../pages/admin/UsersNewPage";
import UsersPage from "../pages/admin/UsersPage";
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
