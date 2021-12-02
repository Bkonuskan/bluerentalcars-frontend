import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionTitle from "../common/SectionTitle";
import CustomerServiceCard from "./CustomerServiceCard";
import services from "../../data/services";

const CustomerServices = () => {
  return (
    <Container>
      <SectionTitle title="Customer Services" />

      <Row className="g-5">
        {services.map((service) => (
          <Col md={6} key={service.id}>
            <CustomerServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomerServices;
