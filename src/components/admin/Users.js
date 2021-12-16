import React, { useState, useEffect } from "react";
import { Table, Button, ButtonGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { downloadUsers, getUsers } from "../../api/admin-user-service";
import fileDownloader from "js-file-download";

const Users = () => {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [downloadingUsers, setDownloadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


    const handleDownload = () => {
        setDownloadingUsers(true);
        downloadUsers().then(resp=>{
            console.log(resp.data);
            fileDownloader(resp.data, "users.xlsx");
            setDownloadingUsers(false);
        })
    }

    const handleEdit = (userId) => {
        navigate(`/admin/users/${userId}`);
    }
    


  useEffect(() => {
    getUsers().then((resp) => {
      setUsers(resp.data);
      setLoadingUsers(false);
    });
  }, []);

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/users/new">
          New User
        </Button>
        <Button variant="secondary" disabled={downloadingUsers} onClick={handleDownload}>
          {downloadingUsers && <Spinner animation="border" size="sm" />}{" "}
          Download List
        </Button>
      </ButtonGroup>

      <Table striped bordered hover responsive className="admin-list mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {loadingUsers ? (
            <tr>
              <td colSpan={5}>
                <Spinner animation="border" size="sm" /> Users are loading...
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index} onClick={()=>handleEdit(user.id)} className="cursor-hand">
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roles.join(" ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
