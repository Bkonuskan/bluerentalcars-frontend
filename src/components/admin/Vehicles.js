import React, { useState, useEffect } from "react";
import { downloadVehicles } from "../../api/admin-vehicle-service";
import { Table, Button, ButtonGroup, Spinner } from "react-bootstrap";
import fileDownload from "js-file-download";
import { getVehicles } from "../../api/vehicle-service";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const [downloadingVehicles, setDownloadingVehicles] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  const handleNewVehicle = () => {};

  const handleDownloadVehicles = () => {
    setDownloadingVehicles(true);
    downloadVehicles().then(resp=>{
      fileDownload(resp.data, "vehicles.xlsx");
      setDownloadingVehicles(false);
    });
  };

  const handleEditVehicle = () => {
    
  }


  useEffect(() => {
   getVehicles().then(resp=>{
    setVehicles(resp.data);
    setLoadingVehicles(false);
   })
  }, [])

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" onClick={handleNewVehicle}>
          New Vehicle
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownloadVehicles}
          disabled={downloadingVehicles}
        >
          {downloadingVehicles && (
            <Spinner animation="border" variant="light" size="sm" />
          )}{" "}
          Download List
        </Button>
      </ButtonGroup>
      
      <Table striped bordered hover responsive className="admin-list mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Model</th>
            <th>Transmission</th>
            <th>Fuel Type</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {loadingVehicles ? (
            <tr colSpan={5}>
              <Spinner animation="border" size="sm" /> Vehicles are loading...
            </tr>
          ) : (
            vehicles.map((vehicle, index) => (
              <tr key={index} onClick={() => handleEditVehicle(vehicle.id)}>
                <td>{index + 1}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.transmission}</td>
                <td>{vehicle.fuelType}</td>
                <td>{vehicle.age}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Vehicles;
