import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import SectionTitle from "../common/SectionTitle";
import partnerList from "../../data/partners";

const Partners = () => {
  return (
    <Container>
      <SectionTitle title="Our Partners" />
      <Row>
        <Col>
          To contribute to positive change and achieve our sustainability goals,
          we partner with many extraordinary organizations around the world.
          Their expertise enables us to do far more than we could alone, and
          their passion and talent inspire us. It is our pleasure to introduce
          you to a handful of the organizations whose accomplishments and
          commitments are representative of all the organizations we are
          fortunate to call our partners.
        </Col>
      </Row>
      <Row className="mt-2">
          {partnerList.map((partner,index)=><Col key={index}>
            <Image src={require(`../../assets/img/partners/${partner.image}`).default} alt={partner.title} className="img-fluid"/>
        </Col>)}
      </Row>
    </Container>
  );
};

export default Partners;
