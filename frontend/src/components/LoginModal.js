
import { useState } from "react";
import axios from "axios";
import "./AuthModal.css";

function LoginModal({
  closeModal,
  openSignup
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      setError("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        "https://ai-finance-tracker-mf04.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      // SAVE TOKEN

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      closeModal();

      window.location.href = "/dashboard";

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid Credentials"
      );

    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✖
        </button>

        <h2>Login</h2>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="switch-text">

          Don't have an account?

          <span
            onClick={() => {

              closeModal();

              openSignup();

            }}
          >
            Signup
          </span>

        </p>

      </div>

    </div>
  );
}

export default LoginModal;
