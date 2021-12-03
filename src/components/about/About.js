import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import about from "../../assets/img/about-us.jpg";
import signature from "../../assets/img/signature.png";

const About = () => {
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Image src={about} className="img-fluid" alt="About Us"/>
        </Col>
        <Col lg={6}>
          <h2>What do we offer?</h2>
          <p>
            Whether you're flying into undefined for a short break or a longer
            stay, you can take the stress out of your onward journey by renting
            a car. We make it easy to find the best deal. Simply tell us your
            travel dates and we'll show you which cars are available with the
            best prices.
          </p>
          <p>
            You can get more out of your trip if you rent a car. You don't need
            to rely on public transport to and from undefined, instead you can
            step off the plane and drive straight to your destination. No more
            struggling to squeeze your
          </p>
          <p>
            Looking for a small or medium economy car rental or something a
            little larger to fit all the family? We have a great range of new
            and comfortable rental cars to choose from. Browse our fleet range
            now and rent a car online today.
          </p>
          <p align="right">
              <Image src={signature} alt="Signature"/>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
