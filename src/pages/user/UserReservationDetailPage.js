import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";
import Details from "../../components/userReservations/Details";

const UserReservationDetailPage = () => {
  return (
    <>
      <PageHeader title="Reservation Detail" />
      <Spacer />
      <Details/>
      <Spacer />
    </>
  );
};

export default UserReservationDetailPage;
