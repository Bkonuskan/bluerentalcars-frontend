import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button, Spinner } from "react-bootstrap";
import { updatePassword } from "../../api/user-service";

const PasswordForm = ({user}) => {
  const [loading, setLoading] = useState(false);
  
  const initialValues = {
    oldPassword:  "",
    newPassword: "",
    confirmPassword: "",
  };


  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string().required("Please enter your new password"),
    confirmPassword: Yup.string()
      .required("Please enter new password retry")
      .oneOf([Yup.ref("newPassword"), null], "Passwords dosen`t match"),
  });

  const onSubmit = (values) => {
    setLoading(true);
    updatePassword(values).then(resp=> {
      toast("Your password was updated successfully");
      setLoading(false);
    }).
    catch(err=> {
      toast("An error occured. Please try later");
      setLoading(false);
    })
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
    
});

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          type="password"
          {...formik.getFieldProps("oldPassword")}
          isInvalid={!!formik.errors.oldPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.oldPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          {...formik.getFieldProps("newPassword")}
          isInvalid={!!formik.errors.newPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.newPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password (Retry)</Form.Label>
        <Form.Control
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          isInvalid={!!formik.errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" disabled={user.builtIn || loading}>
        {loading && <Spinner animation="border" variant="light" size="sm" />}{" "}
        Update Password
      </Button>
      
    </Form>
  );
};

export default PasswordForm;
