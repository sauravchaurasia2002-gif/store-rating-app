import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/userService";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/");
  };

  const handleChangePassword =
    async () => {
      try {
        await changePassword({
          userId:
            localStorage.getItem(
              "userId"
            ),
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

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <h3>JWT Token</h3>

      <textarea
        rows="8"
        cols="80"
        value={token || ""}
        readOnly
      />

      <br />
      <br />

      <button onClick={logout}>
        Logout
      </button>

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
    </div>
  );
}

export default Dashboard;