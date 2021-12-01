import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SliderCarousel from "./SliderCarousel";
import SliderForm from "./SliderForm";

const Slider = () => {
  return (
    <div className="slider">
      <Container>
          <Row>
              <Col lg={{span:7, order:"last"}}>
                    <SliderCarousel/>
              </Col>
              <Col lg={{span:5, order:"first"}}>
                    <SliderForm/> 
              </Col>
          </Row>
      </Container>
    </div>
  );
};

export default Slider;
