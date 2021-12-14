import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";
import Reservations from "../../components/user/Reservations";

const UserReservationsPage = () => {
  return (
    <>
      <PageHeader title="Reservations" />
      <Spacer />
      <Container>
        <Row>
          <Col>
            <Reservations />
          </Col>
        </Row>
      </Container>
      <Spacer />
    </>
  );
};

export default UserReservationsPage;
