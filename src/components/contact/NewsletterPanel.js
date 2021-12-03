import React from "react";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

const NewsletterPanel = () => {
  return (
    <div className="newsletter">
      <Container>
        <Row>
          <Col lg={6}>
            <h3>Newsletter Subscription</h3>
            <div>
              Subscribe to get information about exclusive services, offers and
              promotions
            </div>
          </Col>
          <Col lg={6}>
            <Form>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Type your email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button>
                  Subscribe
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsletterPanel;
