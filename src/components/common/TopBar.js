import React from "react";
import { Container, Row, Col, Button, DropdownButton, Dropdown } from "react-bootstrap";
import {
  FiFacebook,
  FiInstagram,
  FiPhoneCall,
  FiTwitter,
  FiUser,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { logout } from "../../store/user/userActions";

const TopBar = () => {
  const { userState, dispatchUser } = useStore();
  const { user, isUserLogin } = userState;


  const handleLogout = () => {
    dispatchUser(logout());
    localStorage.removeItem("token");
  }
  

  return (
    <div className="topbar">
      <Container>
        <Row>
          <Col xs={7}>
            <FiPhoneCall size={16} />{" "}
            <span className="d-none d-md-inline">CALL US</span> +1 235 98 95
          </Col>
          <Col xs={5}>
            <ul>
              <li className="d-none d-md-block">
                <FiYoutube />
              </li>
              <li className="d-none d-md-block">
                <FiFacebook />
              </li>
              <li className="d-none d-md-block">
                <FiTwitter />
              </li>
              <li className="d-none d-md-block">
                <FiInstagram />
              </li>
              <li>
                {isUserLogin ? (
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={`${user.firstName} ${user.lastName}`}
                    size="sm"
                    align="end"
                  >
                    <Dropdown.Item as={Link} to="/reservations">Reservations</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    
                  </DropdownButton>
                ) : (
                  <Button as={Link} size="sm" to="/login">
                    <FiUser /> Login
                  </Button>
                )}
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
