import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";
import Details from "../../components/user/Details";

const UserReservationDetailPage = () => {
  const { reservationId } = useParams();

  return (
    <>
      <PageHeader title="Reservation Detail" />
      <Spacer />
      <Details reservationId={reservationId} />
      <Spacer />
    </>
  );
};

export default UserReservationDetailPage;
