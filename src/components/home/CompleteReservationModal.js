import React, { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Image,
  Col,
  Container,
  Card,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaRegAddressCard } from "react-icons/fa";
import { FiCalendar, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { useStore } from "../../store";
import MaskInput from "react-maskinput/lib";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createReservation } from "../../api/reservation-service";
import { toast } from "react-toastify";
import moment from "moment";
import { reservationReducer } from "../../store/reservation/reservationReducer";

const CompleteReservationModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { vehiclesState, reservationState, userState } = useStore();
  const { vehicles } = vehiclesState;
  const { reservation } = reservationState;
  const { user } = userState;
  const { onHide, onReset } = props;

  const vehicleImageId =
    reservation &&
    vehicles.filter((vehicle) => vehicle.id == reservation.car)[0].image[0];

  const initialValues = {
    cardNo: "",
    nameOnCard: "",
    expireDate: "",
    cvc: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    cardNo: Yup.string().required("Please enter the card number"),
    nameOnCard: Yup.string().required("Please enter the name of card"),
    expireDate: Yup.string().required("Please enter the expire date"),
    cvc: Yup.number().required("Please enter the cvc"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
  });

  const onSubmit = (values) => {
    setLoading(true);

    const reservationDto = {
      car: reservation.car,
      pickUpLocation: reservation.pickUpLocation,
      dropOfLocation: reservation.dropOfLocation,
      pickUpTime: moment(
        `${reservation.pickUpDate} ${reservation.pickUpTime}`
      ).format("MM/DD/YYYY hh:mm:ss"),
      dropOfTime: moment(
        `${reservation.dropOffDate} ${reservation.dropOffTime}`
      ).format("MM/DD/YYYY hh:mm:ss"),
    };

    createReservation(reservationDto)
      .then((resp) => {
        setLoading(false);
        toast("Reservation created successfully");
        onHide();
        onReset();
      })
      .catch((err) => {
        setLoading(false);
        toast("An error occured, please try later");
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Modal {...props} size="lg">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="reservationSummary">
            <Row className="g-4">
              <Col lg={6}>
                <h5>Vehicle</h5>
                <Image
                  src={`${process.env.REACT_APP_API_URL}files/display/${vehicleImageId}`}
                  className="img-fluid"
                />
              </Col>
              <Col lg={6}>
                <h5>Location &amp; Date</h5>
                <p>
                  <FiMapPin className="icon" />
                  <span>
                    <b>Pick-Up Time</b>
                    <br />
                    {reservation.pickUpDate} {reservation.pickUpTime}
                  </span>
                </p>
                <p>
                  <FiMapPin className="icon" />
                  <span>
                    <b>Drop-Off Time</b>
                    <br />
                    {reservation.dropOffDate} {reservation.dropOffTime}
                  </span>
                </p>
                <p>
                  <FiCalendar className="icon" />
                  <span>
                    <b>Pick-Up Location</b>
                    <br />
                    {reservation.pickUpLocation}
                  </span>
                </p>
                <p>
                  <FiCalendar className="icon" />
                  <span>
                    <b>Drop-Off Location</b>
                    <br />
                    {reservation.dropOfLocation}
                  </span>
                </p>
              </Col>
              <Col lg={6}>
                <h5>Customer</h5>
                <p>
                  <FaRegAddressCard className="icon" />
                  <span>
                    <b>Name</b>
                    <br />
                    {user.firstName} {user.lastName}
                  </span>
                </p>
                <p>
                  <FiMapPin className="icon" />
                  <span>
                    <b>Address</b>
                    <br />
                    {user.address} {user.zipCode}
                  </span>
                </p>
                <p>
                  <FiPhoneCall className="icon" />
                  <span>
                    <b>Phone</b>
                    <br />
                    {user.phoneNumber}
                  </span>
                </p>
              </Col>
              <Col lg={6}>
                <h5>Payment</h5>

                <Card>
                  <Card.Body>
                    <Alert variant="warning">
                      Total price: ${reservation.totalPrice}
                    </Alert>

                    <Form.Group className="mb-3">
                      <Form.Label>Card number</Form.Label>
                      <Form.Control
                        type="text"
                        as={MaskInput}
                        alwaysShowMask
                        maskChar="_"
                        mask="0000-0000-0000-0000"
                        size="sm"
                        {...formik.getFieldProps("cardNo")}
                        isInvalid={!!formik.errors.cardNo}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        {...formik.getFieldProps("nameOnCard")}
                        isInvalid={!!formik.errors.nameOnCard}
                      />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Expire Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Expire Date"
                            as={MaskInput}
                            alwaysShowMask
                            maskChar="_"
                            mask="00/00"
                            maskString="MM/YY"
                            size="sm"
                            {...formik.getFieldProps("expireDate")}
                            isInvalid={!!formik.errors.expireDate}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>CVC</Form.Label>
                          <Form.Control
                            type="text"
                            as={MaskInput}
                            alwaysShowMask
                            maskChar="_"
                            mask="000"
                            size="sm"
                            {...formik.getFieldProps("cvc")}
                            isInvalid={!!formik.errors.cvc}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Form.Check
                  type="checkbox"
                  label="I have read and aggree the sales contract"
                  {...formik.getFieldProps("contract")}
                  isInvalid={!!formik.errors.contract}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm" />} Complete
            Reservation
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CompleteReservationModal;
