import React from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { vehicleList } from "../../data/vehicleList";
import { useFormik } from "formik";
import * as Yup from "yup";

const SliderForm = () => {
  const initialValues = {
    car: "",
    pickUpPlace: "",
    dropOffPlace: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
  };

  const validationSchema = Yup.object({
    car: Yup.string().required("Select a car please."),
    pickUpPlace: Yup.string().required("Enter a pick up place please."),
    dropOffPlace: Yup.string().required("Enter a drop off place please."),
    pickUpDate: Yup.string().required("Select a pick up date please."),
    pickUpTime: Yup.string().required("Select a pick up time please."),
    dropOffDate: Yup.string().required("Select a drop off date please."),
    dropOffTime: Yup.string().required("Select a drop off time please."),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Select
        size="lg"
        className="mb-3"
        {...formik.getFieldProps("car")}
        isInvalid={!!formik.errors.car}
      >
        <option>Select a car</option>
        {vehicleList.map((vehicle) => (
          <option value={vehicle.id} key={vehicle.id}>
            {vehicle.model}
          </option>
        ))}
      </Form.Select>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{ flex: 1 }} >
          <FiMapPin />
          &nbsp;Pick up
        </InputGroup.Text>
        <FormControl
          placeholder="Type a place"
          style={{ flex: 3 }}
          {...formik.getFieldProps("pickUpPlace")}
          isInvalid={!!formik.errors.pickUpPlace}
        />
      </InputGroup>
      

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
          <FiMapPin />
          &nbsp;Drop off
        </InputGroup.Text>
        <FormControl
          placeholder="Type a place"
          style={{ flex: 3 }}
          {...formik.getFieldProps("dropOffPlace")}
          isInvalid={!!formik.errors.dropOffPlace}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
          <FiCalendar />
          &nbsp;Pick up
        </InputGroup.Text>
        <FormControl
          type="date"
          style={{ flex: 2 }}
          {...formik.getFieldProps("pickUpDate")}
          isInvalid={!!formik.errors.pickUpDate}
        />
        <FormControl
          type="time"
          style={{ flex: 1 }}
          {...formik.getFieldProps("pickUpTime")}
          isInvalid={!!formik.errors.pickUpTime}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" style={{ flex: 1 }}>
          <FiCalendar />
          &nbsp;Drop off
        </InputGroup.Text>
        <FormControl
          type="date"
          style={{ flex: 2 }}
          {...formik.getFieldProps("dropOffDate")}
          isInvalid={!!formik.errors.dropOffDate}
        />
        <FormControl
          type="time"
          style={{ flex: 1 }}
          {...formik.getFieldProps("dropOffTime")}
          isInvalid={!!formik.errors.dropOffTime}
        />
      </InputGroup>

      <Button size="lg" className="w-100" type="submit">
        CONTINUE RESERVATION
      </Button>
    </Form>
  );
};

export default SliderForm;
