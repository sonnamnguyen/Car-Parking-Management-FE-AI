import React, { useState } from "react";
import "../css/Investor.css";
import "../css/mobile-responsive.css";
import "../css/subscribe-mobile.css";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email) {
      // Here you would typically send the email to your backend or API
      setSubmitted(true);
    }
  };

  return (
    <section className="subscribe">
      <div className="container">
        <div className="subscribe-wrap">
          <div className="subscribe-text">
            <div className="main-title">Invest With Us</div>
            <p>
              Enter your email to receive investment opportunities, news, and
              updates from Parkin AI.
            </p>
          </div>
          <div className="subscribe-form">
            <div className="parkin-input">
              <input
                id="email"
                placeholder="Your email address"
                required
                className="form-control"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="theme-button btn btn-secondary"
              aria-label="Subscribe"
              onClick={handleSubmit}
            >
              Contact Us
            </button>
          </div>
        </div>
        {submitted && (
          <div className="subscribe-success">
            Thank you! We will contact you soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default Subscribe;
