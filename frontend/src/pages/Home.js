
import React, { useState } from "react";

import "./Home.css";

import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

function Home() {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (

    <div className="home">

      {/* HERO */}

      <section id="home" className="hero">

<Navbar setShowLogin={setShowLogin} />


        <div className="overlay">

          <h1>💰 Finance Tracker</h1>

          <p>
            Smart AI powered expense management system
          </p>

          <button
            className="hero-btn"
            onClick={() => setShowSignup(true)}
          >
            Get Started
          </button>

        </div>

      </section>

      {/* WHY SECTION */}

      <section className="section" id="why">

        <h2>Why Finance Tracker?</h2>

        <p className="why-text">
          Finance Tracker helps you manage daily expenses,
          monitor savings, and understand spending patterns
          using smart AI-powered insights.
        </p>

        <div className="why-container">

          <div className="why-box">

            <h3>💸 Expense Tracking</h3>

            <p>
              Easily add and monitor your daily expenses
              in one secure place.
            </p>

          </div>

          <div className="why-box">

            <h3>📊 Smart Analytics</h3>

            <p>
              Visualize your spending habits with charts
              and reports.
            </p>

          </div>

          <div className="why-box">

            <h3>🤖 AI Suggestions</h3>

            <p>
              Get intelligent recommendations to save money
              and improve budgeting.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section id="features" className="section">

        <h2>Features</h2>

        <div className="cards">

          <div className="card">

            <h3>📊 Analytics</h3>

            <p>Beautiful expense charts</p>

          </div>

          <div className="card">

            <h3>🤖 AI Insights</h3>

            <p>Smart spending suggestions</p>

          </div>

          <div className="card">

            <h3>🔒 Secure</h3>

            <p>Protected user dashboard</p>

          </div>

        </div>

      </section>

      {/* LOGIN MODAL */}

      {showLogin && (
      
<LoginModal
  closeModal={() => setShowLogin(false)}

  openSignup={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
/>

      )}

      {/* SIGNUP MODAL */}

      {showSignup && (
        <SignupModal closeModal={() => setShowSignup(false)} 
        openLogin={() => { setShowSignup(false);
           setShowLogin(true); }} />
        
      )}

    </div>
  );
}

export default Home;
