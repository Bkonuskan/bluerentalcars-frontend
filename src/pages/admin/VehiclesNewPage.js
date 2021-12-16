import React from "react";
import { Container } from "react-bootstrap";
import VehicleNew from "../../components/admin/VehicleNew";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const VehiclesNewPage = () => {
  return (
    <>
      <PageHeader title="VEhicle Management" />
      <Spacer />
      <Container><VehicleNew/></Container>
      <Spacer />
    </>
  );
};

export default VehiclesNewPage;
