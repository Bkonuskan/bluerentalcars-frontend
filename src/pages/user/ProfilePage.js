import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PageHeader from "../../components/common/PageHeader";
import Spacer from "../../components/common/Spacer";
import PasswordForm from "../../components/profile/PasswordForm";
import ProfileForm from "../../components/profile/ProfileForm";
import { useStore } from "../../store";

const ProfilePage = () => {
  const { userState } = useStore();
  const { user } = userState;

  return (
    <>
      <PageHeader title="Profile" />

      <Spacer />
      <Container>
        <Row>
          <Col md={2} style={{ textAlign: "center" }}>
            <FaUserCircle size="128" />
            <h5>
              {user.firstName} {user.lastName}
            </h5>
            <em>{user.email}</em>
          </Col>
          <Col md={1}></Col>
          <Col md={4} className="mt-5 mt-md-0">
            <h3>Profile</h3>

            <ProfileForm user={user} />
          </Col>
          <Col md={1}></Col>
          <Col md={4} className="mt-5 mt-md-0">
            <h3>Update Password</h3>

            <PasswordForm />
          </Col>
        </Row>
      </Container>
      <Spacer />
    </>
  );
};

export default ProfilePage;
