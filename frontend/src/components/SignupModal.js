
import axios from "axios";
import { useState } from "react";
import "./AuthModal.css";

function SignupModal({ closeModal, openLogin }) {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");

  const [error, setError] = useState("");

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // NEXT BUTTON

  const handleNext = () => {

    // EMPTY CHECK

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      setError("Please fill all fields");
      return;
    }

    // PHONE VALIDATION

    if (formData.phone.length !== 10) {

      setError("Phone number must be 10 digits");
      return;
    }

    // EMAIL VALIDATION

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {

      setError("Enter valid email");
      return;
    }

    // PASSWORD VALIDATION

    if (formData.password.length < 6) {

      setError("Password must be minimum 6 characters");
      return;
    }

    // PASSWORD MATCH

    if (formData.password !== formData.confirmPassword) {

      setError("Passwords do not match");
      return;
    }

    // GENERATE OTP

    const otpCode =
      Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOTP(otpCode);

    alert("Verification Code: " + otpCode);

    setError("");

    setStep(2);
  };

  // VERIFY OTP

  const verifyOTP = async () => {

    if (otp === generatedOTP) {

      try {

        const res = await axios.post(
  "https://ai-finance-tracker-mf04.onrender.com/api/auth/register",
  {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
  }
);

// SAVE USER
localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Signup Successful");

        closeModal();

        window.location.href = "/dashboard";

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data?.message ||
          "Signup Failed"
        );

      }

    } else {

      setError("Invalid Verification Code");

    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        {/* CLOSE BUTTON */}

        <button
          className="close-btn"
          onClick={closeModal}
        >
          ✖
        </button>

        {/* STEP 1 */}

        {
          step === 1 ? (

            <>

              <h2>Create Account</h2>

              {error && (
                <p className="error-text">
                  {error}
                </p>
              )}

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                className="auth-btn"
                onClick={handleNext}
              >
                Next
              </button>

              <p className="switch-text">

                Already have an account?

                <span
                  onClick={() => {

                    closeModal();

                    openLogin();

                  }}
                >
                  Login
                </span>

              </p>

            </>

          ) : (

            <>
              {/* STEP 2 */}

              <h2>Email Verification</h2>

              {error && (
                <p className="error-text">
                  {error}
                </p>
              )}

              <input
                type="text"
                placeholder="Enter Verification Code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                className="auth-btn"
                onClick={verifyOTP}
              >
                Verify
              </button>

            </>

          )
        }

      </div>

    </div>
  );
}

export default SignupModal;
