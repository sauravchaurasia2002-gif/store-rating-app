import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [storeSearch, setStoreSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");
  const [storeSort, setStoreSort] = useState("asc");

  // User Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");

  // Store Form
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats"
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/stores"
      );
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users",
        {
          name,
          email,
          password,
          address,
          role,
        }
      );

      alert("User Added Successfully");

      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setRole("user");

      fetchStats();
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Failed To Add User");
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/stores",
        {
          name: storeName,
          email: storeEmail,
          address: storeAddress,
        }
      );

      alert("Store Added Successfully");

      setStoreName("");
      setStoreEmail("");
      setStoreAddress("");

      fetchStats();
      fetchStores();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Store");
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(userSearch.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(userSearch.toLowerCase()) ||
        user.address
          .toLowerCase()
          .includes(userSearch.toLowerCase()) ||
        user.role
          .toLowerCase()
          .includes(userSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const filteredStores = stores
    .filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(storeSearch.toLowerCase()) ||
        store.email
          .toLowerCase()
          .includes(storeSearch.toLowerCase()) ||
        store.address
          .toLowerCase()
          .includes(storeSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (storeSort === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const viewUser = (user) => {
    alert(
      "Name: " +
        user.name +
        "\n\nEmail: " +
        user.email +
        "\n\nAddress: " +
        user.address +
        "\n\nRole: " +
        user.role
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Total Users: {stats.totalUsers}</h2>
      <h2>Total Stores: {stats.totalStores}</h2>
      <h2>Total Ratings: {stats.totalRatings}</h2>

      <hr />

      <h2>Add User</h2>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Store Owner</option>
        </select>

        <br /><br />

        <button type="submit">
          Add User
        </button>
      </form>

      <hr />

      <h2>Add Store</h2>

      <form onSubmit={handleAddStore}>
        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Store Email"
          value={storeEmail}
          onChange={(e) => setStoreEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Store Address"
          value={storeAddress}
          onChange={(e) => setStoreAddress(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Add Store
        </button>
      </form>

      <hr />

      <h2>All Stores</h2>

      <input
        type="text"
        placeholder="Search Stores"
        value={storeSearch}
        onChange={(e) => setStoreSearch(e.target.value)}
      />

      <br /><br />

      <select
        value={storeSort}
        onChange={(e) => setStoreSort(e.target.value)}
      >
        <option value="asc">
          Name Ascending
        </option>

        <option value="desc">
          Name Descending
        </option>
      </select>

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Average Rating</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>
                {Number(store.average_rating).toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>All Users</h2>

      <input
        type="text"
        placeholder="Search Users"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />

      <br /><br />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">
          Name Ascending
        </option>

        <option value="desc">
          Name Descending
        </option>
      </select>

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Action</th>
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
              <td>
                <button
                  onClick={() =>
                    viewUser(user)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br /><br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;