import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Row,
  Col,
  Table,
  Accordion,
  Button,
} from "react-bootstrap";
import { FiCheck, FiCrosshair, FiArrowLeft, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getReservation } from "../../api/reservation-service";

const Details = ({ reservationId }) => {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getReservation(reservationId).then((resp) => {
      setReservation(resp.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      {!loading && (
        <Row>
          <Col lg={5}>
            <h2 className="text-center">{reservation.car.model}</h2>
            <Image
              src={`${process.env.REACT_APP_API_URL}files/${reservation.car.image[0]}`}
              className="rounded"
            />
          </Col>
          <Col lg={5}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Reservation Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          <h3>${reservation.totalPrice}</h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pick up location</td>
                        <td>{reservation.pickUpLocation}</td>
                      </tr>
                      <tr>
                        <td>Drop off location</td>
                        <td>{reservation.dropOfLocation}</td>
                      </tr>
                      <tr>
                        <td>Pick up time</td>
                        <td>{moment(reservation.pickUpTime).format("lll")}</td>
                      </tr>
                      <tr>
                        <td>Drop off time</td>
                        <td>{moment(reservation.dropOfTime).format("lll")}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{reservation.status}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Car Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Model</td>
                        <td>{reservation.car.model}</td>
                      </tr>
                      <tr>
                        <td>Doors</td>
                        <td>{reservation.car.doors}</td>
                      </tr>
                      <tr>
                        <td>Seats</td>
                        <td>{reservation.car.seats}</td>
                      </tr>
                      <tr>
                        <td>Luggage</td>
                        <td>{reservation.car.luggage}</td>
                      </tr>
                      <tr>
                        <td>Transmission</td>
                        <td>{reservation.car.transmission}</td>
                      </tr>
                      <tr>
                        <td>Air Conditioning</td>
                        <td>
                          {reservation.car.airConditioning ? (
                            <FiCheck />
                          ) : (
                            <FiCrosshair />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Fuel Type</td>
                        <td>{reservation.car.fuelType}</td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>{reservation.car.age}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col lg={2}>
            <Button variant="secondary"  className="w-100 mt-3" onClick={()=> navigate(-1)}>
              <FiArrowLeft /> Back to reservations
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Details;
