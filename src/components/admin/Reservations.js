import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { downloadReservations, getReservations } from "../../api/admin-reservation-service";
import fileDownloader from "js-file-download";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownloadReservations = () => {
    setDownloading(true);
    downloadReservations().then((resp) => {
      fileDownloader(resp.data, "reservations.xlsx");
      setDownloading(false);
    });
  };

  const showDetails = (reservationId) => {
    navigate(`/admin/reservations/${reservationId}`);
  };

  useEffect(() => {
    getReservations().then((resp) => {
      setReservations(resp.data);
      setLoading(false);
    });
  }, []);

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
            <tr key={index} onClick={() => showDetails(item.id)} className="cursor-hand">
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
