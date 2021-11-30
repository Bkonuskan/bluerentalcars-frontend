import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FiFacebook,
  FiInstagram,
  FiPhoneCall,
  FiTwitter,
  FiUser,
  FiYoutube,
} from "react-icons/fi";

const TopBar = () => {
  return (
    <div className="topbar">
      <Container>
        <Row>
          <Col>
            <FiPhoneCall size={16} /> CALL US +1 235 98 95
          </Col>
          <Col>
            <ul>
              <li>
                <FiYoutube />
              </li>
              <li>
                <FiFacebook />
              </li>
              <li>
                <FiTwitter />
              </li>
              <li>
                <FiInstagram />
              </li>
              <li>
                <Button size="sm">
                  <FiUser /> Login
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
