import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser({
        email,
        password,
      });

      console.log(result);
      console.log("TOKEN =", result.token);
     localStorage.setItem(
  "token",
  result.token
);

localStorage.setItem(
  "userId",
  result.user.id
);

localStorage.setItem(
  "role",
  result.user.role
);

     if (
  result.user.role === "admin"
) {
  navigate("/admin-dashboard");
}
else if (
  result.user.role === "owner"
) {
  navigate("/owner-dashboard");
}
else {
  navigate("/stores");
}
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

        <br />

<p>
  Don't have an account?
  {" "}
  <Link to="/register">
    Register Here
  </Link>
</p> 
      </form>
    </div>
  );
}

export default Login;