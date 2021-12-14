import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Image,
  Table,
  Dropdown,
} from "react-bootstrap";
import { FiCheck, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { useStore } from "../../store";
import SectionTitle from "../common/SectionTitle";

const Vehicles = () => {
  const { vehiclesState } = useStore();
  const { vehicles } = vehiclesState;

  console.log(vehicles);

  const [activeVehicle, setActiveVehicle] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const vehiclesLength = 5;

  const handleStartIndex = (index) => {
    if (index < 0 || index > vehicles.length - vehiclesLength - 1) return;
    setStartIndex(index);
  };

  return (
    <Container>
      <SectionTitle title="Vehicles" />

      {vehicles.length > 0 && (
        <Row>
          <Col lg={3}>
            <Dropdown size="lg" className="d-lg-none vehiclesDropDown">
              <Dropdown.Toggle className="w-100">
                {vehicles[activeVehicle].model}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {vehicles.map((vehicle, index) => (
                  <Dropdown.Item
                    key={vehicle.id}
                    onClick={() => setActiveVehicle(index)}
                  >
                    {vehicle.model}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <ul className="vehicleList d-none d-lg-block">
              <li>
                <Button
                  onClick={() => handleStartIndex(startIndex - 1)}
                  disabled={startIndex <= 0}
                >
                  <FiChevronUp />
                </Button>
              </li>
              {vehicles.map((vehicle, index) => {
                if (
                  index >= startIndex &&
                  index <= startIndex + vehiclesLength
                ) {
                  return (
                    <li
                      key={vehicle.id}
                      className={index === activeVehicle ? "active" : ""}
                      onClick={() => setActiveVehicle(index)}
                    >
                      {vehicle.model}
                    </li>
                  );
                }
                return null;
              })}

              <li>
                <Button
                  onClick={() => handleStartIndex(startIndex + 1)}
                  disabled={startIndex >= vehicles.length - vehiclesLength - 1}
                >
                  <FiChevronDown />
                </Button>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <Image
              src={`${process.env.REACT_APP_API_URL}files/display/${vehicles[activeVehicle].image[0]}`}
              className="img-fluid"
            />
          </Col>
          <Col lg={3}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={2}>
                    <h3>${vehicles[activeVehicle].pricePerHour} per hour</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="50%">Model</td>
                  <td>{vehicles[activeVehicle].model}</td>
                </tr>
                <tr>
                  <td>Doors</td>
                  <td>{vehicles[activeVehicle].doors}</td>
                </tr>
                <tr>
                  <td>Seats</td>
                  <td>{vehicles[activeVehicle].seats}</td>
                </tr>
                <tr>
                  <td>Luggage</td>
                  <td>{vehicles[activeVehicle].luggage}</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{vehicles[activeVehicle].transmission}</td>
                </tr>
                <tr>
                  <td>Air Conditioning</td>
                  <td>
                    {vehicles[activeVehicle].airConditioning ? (
                      <FiCheck />
                    ) : (
                      <FiX />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{vehicles[activeVehicle].fuelType}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{vehicles[activeVehicle].age}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Vehicles;
