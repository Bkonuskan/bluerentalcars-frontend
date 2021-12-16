import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "../../api/user-service";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import { loginFailed, loginSuccess } from "../../store/user/userActions";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { dispatchUser } = useStore();
  const navigate = useNavigate();

  const initialValues = {
    email: "admin@bluerentalcars.com",
    password: "12345",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = (values) => {
    setLoading(true);

    login(values)
      .then((respLogin) => {
        localStorage.setItem("token", respLogin.data.token);

        getUser().then((respUser) => {
          dispatchUser(loginSuccess(respUser.data));
          navigate("/");
          setLoading(false);
        })
        .catch(err=> {
          toast(err.response.data.message);
          setLoading(false);
          dispatchUser(loginFailed());
        })

        
      })
      .catch((err) => {
        toast(err.response.data.message);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    {...formik.getFieldProps("email")}
                    isInvalid={!!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...formik.getFieldProps("password")}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading && <Spinner animation="border" size="sm" />} Login
                  </Button>

                  <Link to="/register">Create new user</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
