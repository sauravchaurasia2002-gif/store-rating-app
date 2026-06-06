import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/registerService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (name.length < 20 || name.length > 60) {
  alert("Name must be between 20 and 60 characters");
  return;
}

if (address.length > 400) {
  alert("Address cannot exceed 400 characters");
  return;
}

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

if (!passwordRegex.test(password)) {
  alert(
    "Password must be 8-16 characters with one uppercase and one special character"
  );
  return;
}

    try {
      const result = await registerUser({
        name,
        email,
        address,
        password,
      });

      alert(result.message);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <br />

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
          <label>Address</label>
          <br />
          <textarea
            rows="4"
            cols="30"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
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
          Register
        </button>
      </form>

      <br />

      <p>
        Already have an account?
        {" "}
        <Link to="/">
          Login Here
        </Link>
      </p>
    </div>
  );
}

export default Register;