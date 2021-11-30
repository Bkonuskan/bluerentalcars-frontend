import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SliderCarousel from "./SliderCarousel";

const Slider = () => {
  return (
    <div className="slider">
      <Container>
          <Row>
              <Col md={{span:7, order:"last"}}>
                    <SliderCarousel/>
              </Col>
              <Col md={{span:5, order:"first"}}>
                    FORM 
              </Col>
          </Row>
      </Container>
    </div>
  );
};

export default Slider;
