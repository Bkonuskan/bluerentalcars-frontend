import React from "react";
import { Container, Spinner } from "react-bootstrap";
import Reservations from "../../components/admin/Reservations";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const ReservationsPage = () => {
  
  return (
    <>
      <PageHeader title="Reservation Management" />
      <Spacer />
      <Container>
          <Reservations />
      </Container>
      <Spacer/>
    </>
  );
};

export default ReservationsPage;
