import React from "react";
import { Container } from "react-bootstrap";
import UserNew from "../../components/admin/UserNew";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";

const UsersNewPage = () => {
  return (
    <>
      <PageHeader title="User Management" />
      <Spacer />
      <Container><UserNew/></Container>
      <Spacer />
    </>
  );
};

export default UsersNewPage;
