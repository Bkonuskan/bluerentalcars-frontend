import React from "react";
import { Container } from "react-bootstrap";
import ReservationEdit from "../../components/admin/ReservationEdit";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const ReservationEditPage = () => {
  return (
    <>
      <PageHeader title="Reservation Management" /> <Spacer />
      <Container>
        <ReservationEdit />
      </Container>
      <Spacer />
    </>
  );
};

export default ReservationEditPage;
