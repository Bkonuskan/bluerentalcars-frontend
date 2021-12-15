import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import MaskInput from "react-maskinput";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Card,
  FormCheck,
} from "react-bootstrap";
import { createUser } from "../../api/admin-user-service";
import { useNavigate } from "react-router-dom";

const UserNew = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    zipCode: "",
    password: "",
    roles: ["Customer"],
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    phoneNumber: Yup.string()
      .required("Please enter phone number")
      .test(
        "includes_",
        "Please enter a valid phone number",
        (value) => value && !value.includes("_")
      ),
    email: Yup.string().email().required("Please enter email"),
    address: Yup.string().required("Please enter address"),
    zipCode: Yup.string().required("Please enter zip code"),
    password: Yup.string().required("Please enter password"),
    roles: Yup.array().required("Please select a role"),
  });

  const onSubmit = (values) => {
      setLoading(true);

      createUser(values).then(resp=>{
          setLoading(false);
          toast("User has been created successfully");
          navigate("/admin/users");
      })
      .catch(err=>{
          toast("An error occured");
          console.log(err.response.data.message);
          setLoading(false);
      })

  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Body>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                {...formik.getFieldProps("firstName")}
                isInvalid={!!formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...formik.getFieldProps("lastName")}
                isInvalid={!!formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                as={MaskInput}
                alwaysShowMask
                maskChar="_"
                mask="(000) 000-0000"
                placeholder="Enter phone number"
                {...formik.getFieldProps("phoneNumber")}
                isInvalid={!!formik.errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                {...formik.getFieldProps("address")}
                isInvalid={!!formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                {...formik.getFieldProps("zipCode")}
                isInvalid={!!formik.errors.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.zipCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                isInvalid={!!formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
                isInvalid={!!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Roles</Form.Label>

              <div className="mb-3">
                <Form.Check
                  inline
                  label="Customer"
                  type="checkbox"
                  name="roles"
                  id="customer"
                  value="Customer"
                  checked={formik.values.roles.includes("Customer")}
                  onChange={formik.handleChange}
                />
                <Form.Check
                  inline
                  label="Admin"
                  type="checkbox"
                  name="roles"
                  id="admin"
                  value="Administrator"
                  checked={formik.values.roles.includes("Administrator")}
                  onChange={formik.handleChange}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                {formik.errors.roles}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="text-end">
            <ButtonGroup aria-label="Basic example">
              <Button variant="primary" type="submit" disabled={loading}>
                Create
              </Button>
              <Button
                variant="secondary"
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default UserNew;
