import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Table, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { BiMessageSquareEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReservations = () => {
    
  }

  const showDetails = () => {
    
  }
  
  

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={handleDownloadReservations}
          disabled={downloading}
        >
          {downloading && (
            <Spinner animation="border" variant="light" size="sm" />
          )}{" "}
          Download List
        </Button>
      </ButtonGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Pick Up</th>
            <th>Drop Off</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          )}
          {reservations.map((item, index) => (
            <tr key={index} onClick={() => showDetails(item.id)}>
              <td>{index + 1}</td>
              <td>{item.car.model}</td>
              <td>
                {item.pickUpLocation}
                <br />
                {moment(item.pickUpTime).format("lll")}
              </td>
              <td>
                {item.dropOfLocation}
                <br />
                {moment(item.dropOfTime).format("lll")}
              </td>
              <td>{item.status}</td>
              <td>${item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reservations;
