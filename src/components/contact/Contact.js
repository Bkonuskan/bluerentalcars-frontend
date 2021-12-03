import React from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { RiHeadphoneLine, RiMailSendLine, RiWhatsappLine } from "react-icons/ri";
import callCenter from "../../assets/img/call-center.jpg";
import cancelReservation from "../../assets/img/cancel-reservation.jpg";
import makeReservation from "../../assets/img/make-reservation.jpg";

const Contact = () => {
  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Card>
            <Row>
              <Col xs={5}>
                <Image src={callCenter} className="img-fluid rounded-start" />
              </Col>
              <Col xs={7}>
                <Card.Body>
                  <Card.Title>Call Center</Card.Title>
                  <Card.Text>
                    <p>
                      <RiHeadphoneLine /> <em>+1 654 7889 45</em>
                    </p>
                    <p>
                      <RiWhatsappLine /> <em>+1 654 7889 46</em>
                    </p>
                    <p>
                      <RiMailSendLine /> <em>info@bluerentalcars.com</em>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={4}>
        <Card>
            <Row>
              <Col xs={5}>
                <Image src={makeReservation} className="img-fluid rounded-start" />
              </Col>
              <Col xs={7}>
                <Card.Body>
                  <Card.Title>Make Reservation</Card.Title>
                  <Card.Text>
                    <p>
                      <RiHeadphoneLine /> <em>+1 654 7889 45</em>
                    </p>
                    <p>
                      <RiWhatsappLine /> <em>+1 654 7889 46</em>
                    </p>
                    <p>
                      <RiMailSendLine /> <em>info@bluerentalcars.com</em>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={4}>
        <Card>
            <Row>
              <Col xs={5}>
                <Image src={cancelReservation} className="img-fluid rounded-start" />
              </Col>
              <Col xs={7}>
                <Card.Body>
                  <Card.Title>Cancel Reservation</Card.Title>
                  <Card.Text>
                    <p>
                      <RiHeadphoneLine /> <em>+1 654 7889 45</em>
                    </p>
                    <p>
                      <RiWhatsappLine /> <em>+1 654 7889 46</em>
                    </p>
                    <p>
                      <RiMailSendLine /> <em>info@bluerentalcars.com</em>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
