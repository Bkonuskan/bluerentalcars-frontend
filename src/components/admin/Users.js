import React, { useState, useEffect } from "react";
import { Table, Button, ButtonGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/admin-user-service";

const Users = () => {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
    

  useEffect(() => {
    getUsers().then((resp) => {
      setUsers(resp.data);
      setLoadingUsers(false);
    });
  }, []);

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/users/new">New User</Button>
        <Button variant="secondary">Download List</Button>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
