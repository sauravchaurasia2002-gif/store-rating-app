import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/userService";

function OwnerDashboard() {
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const ownerId =
    localStorage.getItem("userId");

  useEffect(() => {
    fetchStore();
    fetchRatings();
  }, []);

  const fetchStore = async () => {
    try {
      const response =
        await axios.get(
          `http://localhost:5000/api/stores/owner/${ownerId}`
        );

      if (response.data.length > 0) {
        setStore(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response =
        await axios.get(
          `http://localhost:5000/api/stores/owner-ratings/${ownerId}`
        );

      setRatings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword =
    async () => {
      try {
        await changePassword({
          userId: ownerId,
          oldPassword,
          newPassword,
        });

        alert(
          "Password Changed Successfully"
        );

        setOldPassword("");
        setNewPassword("");
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed To Change Password"
        );
      }
    };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Store Owner Dashboard</h1>

      {store ? (
        <>
          <div>
            <h2>{store.name}</h2>

            <p>
              <b>Email:</b> {store.email}
            </p>

            <p>
              <b>Address:</b>{" "}
              {store.address}
            </p>

            <p>
              <b>Average Rating:</b>{" "}
              {Number(
                store.average_rating
              ).toFixed(1)}
            </p>
          </div>

          <hr />

          <h2>
            Users Who Rated My Store
          </h2>

          <table
            border="1"
            cellPadding="10"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {ratings.map(
                (rating, index) => (
                  <tr key={index}>
                    <td>
                      {rating.name}
                    </td>
                    <td>
                      {rating.email}
                    </td>
                    <td>
                      {rating.rating}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <hr />

          <h2>Change Password</h2>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <button
            onClick={
              handleChangePassword
            }
          >
            Change Password
          </button>

          <br />
          <br />

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <h2>No Store Assigned</h2>
      )}
    </div>
  );
}

export default OwnerDashboard;