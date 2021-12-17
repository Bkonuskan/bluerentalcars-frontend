import React from "react";
import { Container } from "react-bootstrap";
import VehicleEdit from "../../components/admin/VehicleEdit";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const VehiclesEditPage = () => {
  return (
    <>
      <PageHeader title="Vehicles Management" />
      <Spacer />
      <Container><VehicleEdit/></Container>
      <Spacer />
    </>
  );
};

export default VehiclesEditPage;
