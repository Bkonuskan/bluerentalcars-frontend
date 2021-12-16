import React from "react";
import { Container, Spinner } from "react-bootstrap";
import Vehicles from "../../components/admin/Vehicles";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const VehiclesPage = () => {
  
  return (
    <>
      <PageHeader title="Vehicle Management" />
      <Spacer />
      <Container>
          <Vehicles />
      </Container>
      <Spacer/>
    </>
  );
};

export default VehiclesPage;
