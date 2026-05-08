
import "./Navbar.css";

function Navbar({ setShowLogin }) {

  return (

    <nav className="navbar">

      <div className="logo">
        💰 Finance Tracker
      </div>

      <div className="nav-links">

        <a href="#home">Home</a>
        <a href="#why">Why Us</a>
        <a href="#features">Features</a>

        <button
          className="login-btn"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
