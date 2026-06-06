import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      console.log("USERS:", data);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.role
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search Name, Email, Address or Role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;