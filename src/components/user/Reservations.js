import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Table, Spinner } from "react-bootstrap";
import { BiMessageSquareEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { getReservations } from "../../api/reservation-service";

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const showDetails = (id) => {
    navigate(`/reservations/${id}`);
  }
  


  useEffect(() => {
    getReservations().then(resp=>{
      setReservations(resp.data);
      setLoading(false);
    })
   
  }, [])

  
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Car</th>
          <th>Pick Up</th>
          <th>Drop Off</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={5}><Spinner animation="border" size="sm"/> Loading...</td>
          </tr>
        )}
        {reservations.map((item, index) => (
          <tr key={index} onClick={()=>showDetails(item.id)} className="cursor-hand">
            <td>{index + 1}</td>
            <td>{item.car.model}</td>
            <td>{item.pickUpLocation}<br/>{moment(item.pickUpTime).format("lll")}</td>
            <td>{item.dropOfLocation}<br/>{moment(item.dropOfTime).format("lll")}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Reservations;
