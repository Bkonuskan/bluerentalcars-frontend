import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../api/admin-user-service";
import MaskInput from "react-maskinput/lib";
import alertify from "alertifyjs";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    zipCode: "",
    username: "",
    password: "",
    roles: ["Customer"],
    builtIn: false,
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    email: Yup.string().email().required("Please enter your email"),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    roles: Yup.array().required("Please select a role"),
  });

  const onSubmit = (values) => {
    setSaving(true);

    updateUser(userId, values)
      .then((resp) => {
        setSaving(false);
        toast("User was updated successfully");
      })
      .catch((err) => {
        toast("An error occured. Please try again later.");
        setSaving(false);
        console.log(err.response.data.message);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleDelete = () => {
    //userId nin boş olmadığı veya numeric olduğu kontrol edilse iyi olur.

    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {

        setDeleting(true);
        deleteUser(userId)
          .then((resp) => {
            setDeleting(false);
            toast("User was deleted uccessfully");
            navigate(-1);
          })
          .catch((err) => {
            setDeleting(false);
            toast("An error occured. Please try later");
            console.log(err.response.data.message);
          });
      },
      () => {
        console.log("canceled");
      }
    );
  };

  useEffect(() => {
    //userId nin boş olmadığı veya numeric olduğu kontrol edilse iyi olur.

    getUserById(userId).then((resp) => {
      console.log(resp.data);
      setInitialValues(resp.data);
    });
  }, []);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
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
            placeholder="Enter phone number"
            as={MaskInput}
            alwaysShowMask
            maskChar="_"
            mask="(000) 000-0000"
            {...formik.getFieldProps("phoneNumber")}
            isInvalid={!!formik.errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formik.values.email}
            disabled
          />
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
      {initialValues.builtIn && (
        <Alert variant="danger">
          Built-in accounts can not be deleted and updated
        </Alert>
      )}
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          {!initialValues.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Save
              </Button>
              <Button
                type="button"
                variant="danger"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Delete
              </Button>
            </>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
};
export default UserEdit;
