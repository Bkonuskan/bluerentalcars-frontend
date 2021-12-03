import React from "react";
import { Container, Row, Col,Form,Button } from "react-bootstrap";

const ContactForm = () => {
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.1768773689855!2d-98.20481768470718!3d38.34488797965961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a46327f5709f75b!2zMzjCsDIwJzQxLjYiTiA5OMKwMTInMDkuNSJX!5e0!3m2!1str!2str!4v1638566571653!5m2!1str!2str"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </Col>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button type="submit">SEND</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
