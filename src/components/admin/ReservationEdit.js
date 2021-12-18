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
  InputGroup,
} from "react-bootstrap";
import {
  deleteReservation,
  getReservation,
  updateReservation,
} from "../../api/admin-reservation-service";
import alertify from "alertifyjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVehicles } from "../../api/vehicle-service";
import moment from "moment";

const statuses = ["CREATED", "CANCELED", "DONE"];

const ReservationEdit = () => {
  const [initialValues, setInitialValues] = useState({
    pickUpLocation: "",
    dropOfLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    car: "",
    status: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    car: Yup.number().required("Select a car"),
    pickUpLocation: Yup.string().required("Enter the pick up place"),
    dropOfLocation: Yup.string().required("Enter the drop off place"),
    pickUpDate: Yup.string().required("Select the pick up date"),
    dropOffDate: Yup.string().required("Select the drop off date"),
    pickUpTime: Yup.string().required("Select the pick up time"),
    dropOffTime: Yup.string().required("Select the drop off time"),
    status: Yup.string().required("Select a status"),
  });

  const onSubmit = (values) => {
    setLoading(true);

    const reservationDto = {
      pickUpTime: moment(`${values.pickUpDate} ${values.pickUpTime}`).format("MM/DD/YYYY HH:mm:ss"),
      dropOfTime: moment(`${values.dropOffDate} ${values.dropOffTime}`).format("MM/DD/YYYY HH:mm:ss"),
      pickUpLocation: values.pickUpLocation,
      dropOfLocation: values.dropOfLocation,
      status: values.status,
    };

    updateReservation(reservationId, values.car, reservationDto).then(resp=>{
      setLoading(false);
      toast("The reservation was updated successfully");

    })
    .catch(err=>{
      toast("An error occured while updating the reservation");
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

  const handleDelete = () => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {
        setLoading(true);
        deleteReservation(reservationId).then((resp) => {
          toast("The reservation was deleted successfully");
          setLoading(false);
          navigate("/admin/reservations");
        });
      },
      () => {}
    );
  };

  const loadReservation = () => {
    getReservation(reservationId).then((resp) => {
      console.log(resp.data);

      const {
        pickUpLocation,
        dropOfLocation,
        pickUpTime,
        dropOfTime,
        status,
        car,
        userId,
      } = resp.data;

      const reservationDto = {
        pickUpLocation: pickUpLocation,
        dropOfLocation: dropOfLocation,
        pickUpDate: moment(pickUpTime).format("YYYY-MM-DD"),
        pickUpTime: moment(pickUpTime).format("HH:mm"),
        dropOffDate: moment(dropOfTime).format("YYYY-MM-DD"),
        dropOffTime: moment(dropOfTime).format("HH:mm"),
        car: car.id,
        status: status,
        userId: userId,
      };

      setInitialValues(reservationDto);
    });
  };

  const loadVehicles = () => {
    getVehicles().then((resp) => {
      setVehicles(resp.data);
    });
  };

  useEffect(() => {
    loadVehicles();
    loadReservation();
  }, []);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Pick-Up Location</Form.Label>
          <Form.Control
            type="text"
            name="pickUpLocation"
            placeholder="Type a place"
            {...formik.getFieldProps("pickUpLocation")}
            isInvalid={!!formik.errors.pickUpLocation}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.pickUpLocation}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Drop-Off Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type a place"
            {...formik.getFieldProps("dropOfLocation")}
            isInvalid={!!formik.errors.dropOfLocation}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.dropOfLocation}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Pick Up Time</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              {...formik.getFieldProps("pickUpDate")}
              isInvalid={!!formik.errors.pickUpDate}
            />
            <Form.Control
              type="time"
              {...formik.getFieldProps("pickUpTime")}
              isInvalid={!!formik.errors.pickUpTime}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {formik.errors.pickUpDate || formik.errors.pickUpTime}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Drop Off Time</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              {...formik.getFieldProps("dropOffDate")}
              isInvalid={!!formik.errors.dropOffDate}
            />
            <Form.Control
              type="time"
              {...formik.getFieldProps("dropOffTime")}
              isInvalid={!!formik.errors.dropOffTime}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {formik.errors.dropOffDate || formik.errors.dropOffTime}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Vehicle</Form.Label>
          <Form.Select
            {...formik.getFieldProps("car")}
            isInvalid={!!formik.errors.car}
          >
            {vehicles.map((vehicle) => (
              <option value={vehicle.id} key={vehicle.id}>
                {vehicle.model}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.car}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            {...formik.getFieldProps("status")}
            isInvalid={!!formik.errors.status}
          >
            {statuses.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.car}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Customer</Form.Label>
          <div>
            <Link to={`/admin/users/${initialValues.userId}`}>
              Get Customer Info
            </Link>
          </div>
        </Form.Group>
      </Row>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            Save
          </Button>
          <Button
            variant="secondary"
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/reservations")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
export default ReservationEdit;
