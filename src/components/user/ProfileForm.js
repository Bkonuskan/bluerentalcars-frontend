import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form,Button, Spinner, Alert } from "react-bootstrap";
import MaskInput from "react-maskinput/lib";
import { updateUser } from "../../api/user-service";

const ProfileForm = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = user;

  /*
    Object.keys(user).length > 0
      ? user
      : {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          address: "",
          zipCode: "",
        };
*/
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required("Please enter your phone number"),
    email: Yup.string().email().required("Please enter your email"),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
  });

  const onSubmit = (values) => {
    console.log(values);

    delete values["roles"];

    setLoading(true);
    updateUser(values).then(resp=>{
      toast("Your profile updated successfully");
      setLoading(false);
    })
    .catch(err=>{
      toast("An error occured. Please try later.");
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
      <Form.Group className="mb-3">
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

      <Form.Group className="mb-3">
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

      <Form.Group className="mb-3">
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

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={formik.values.email}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3">
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


      <Form.Group className="mb-3">
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
      <Button type="submit" disabled={user.builtIn || loading}>
        {loading && <Spinner animation="border" variant="light" size="sm" />}{" "}
        Save
      </Button>

      {user.builtIn && <Alert variant="warning" className="mt-3">Built-in accounts can not be updated or deleted.</Alert>}
    </Form>
  );
};

export default ProfileForm;
