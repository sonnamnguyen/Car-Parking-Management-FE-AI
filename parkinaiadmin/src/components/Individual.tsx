import React from "react";
import "../css/individual.css";

const Individual: React.FC = () => {
  return (
    <div className="individual-container">
      {/* Hero Section */}
      <section className="individual-hero">
        <div className="hero-content">
          <h1 className="hero-title">Parkin Services for Individuals</h1>
          <p className="hero-subtitle">
            Discover convenient parking solutions designed specifically for your
            daily needs
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Download App</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2 className="section-title">
            Why Choose Parkin for Your Parking Needs?
          </h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="#00D4AA"
                  />
                </svg>
              </div>
              <h3 className="service-title">Easy Booking</h3>
              <p className="service-description">
                Reserve your parking spot in advance with just a few taps on
                your mobile device.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                    fill="#00D4AA"
                  />
                  <path
                    d="M21 9V7L15 4L14 4.5V7H10V4.5L9 4L3 7V9H21Z"
                    fill="#1a5a5a"
                  />
                </svg>
              </div>
              <h3 className="service-title">Real-time Availability</h3>
              <p className="service-description">
                Check live parking availability and find the perfect spot near
                your destination.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                    fill="#00D4AA"
                  />
                </svg>
              </div>
              <h3 className="service-title">Secure Payment</h3>
              <p className="service-description">
                Cashless payments with multiple payment options for your
                convenience and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Features */}
      <section className="app-features">
        <div className="container">
          <div>
            <h2 className="section-title">Parkin Mobile App</h2>
          </div>
          <div className="features-content">
            <div className="features-text">
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <div className="feature-info">
                    <h4>Smart Search</h4>
                    <p>
                      Find parking spots based on your location, destination,
                      and preferences
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <div className="feature-info">
                    <h4>Navigation Integration</h4>
                    <p>
                      Get turn-by-turn directions to your reserved parking spot
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <div className="feature-info">
                    <h4>Digital Wallet</h4>
                    <p>
                      Manage payments, view history, and track your parking
                      expenses
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-check">✓</div>
                  <div className="feature-info">
                    <h4>24/7 Support</h4>
                    <p>
                      Get help whenever you need it with our round-the-clock
                      customer service
                    </p>
                  </div>
                </div>
              </div>
              <div className="download-buttons">
                <button
                  className="download-btn"
                  onClick={() => console.log("Download iOS app")}
                >
                  <img src="/downloadios.jpg" alt="Download on App Store" />
                </button>
                <button
                  className="download-btn"
                  onClick={() => console.log("Download Android app")}
                >
                  <img src="/downloadggplay.png" alt="Get it on Google Play" />
                </button>
              </div>
            </div>
            <div className="features-images-app">
              <div className="mobile-images-app">
                <img
                  src="/mobile.png"
                  alt="Parkin Mobile App"
                  className="mobile-img-1"
                />
                <img
                  src="/mobile3.png"
                  alt="Parkin Mobile App Features"
                  className="mobile-img-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-section">
        <div className="container">
          <h2 className="section-title">Coming Soon Plan</h2>
          <p className="section-subtitle">
            Flexible pricing options to suit your parking frequency and budget
          </p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-header">
                <h3 className="plan-name">Pay-as-you-Go</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">0</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="plan-features">
                <ul>
                  <li>Pay only when you park</li>
                  <li>Standard booking fees</li>
                  <li>Basic customer support</li>
                  <li>Mobile app access</li>
                </ul>
              </div>
              <button className="plan-button">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-header">
                <h3 className="plan-name">Parkin Plus</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">9.99</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="plan-features">
                <ul>
                  <li>15% discount on all bookings</li>
                  <li>Priority booking access</li>
                  <li>Premium customer support</li>
                  <li>Extended booking hours</li>
                  <li>Flexible cancellation</li>
                </ul>
              </div>
              <button className="plan-button">Start Free Trial</button>
            </div>
            <div className="pricing-card">
              <div className="plan-header">
                <h3 className="plan-name">Parkin Pro</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">19.99</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="plan-features">
                <ul>
                  <li>25% discount on all bookings</li>
                  <li>Unlimited monthly parking</li>
                  <li>VIP customer support</li>
                  <li>Advanced booking features</li>
                  <li>Free cancellation anytime</li>
                  <li>Monthly parking analytics</li>
                </ul>
              </div>
              <button className="plan-button">Upgrade Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Parkin has completely changed how I think about parking in
                  the city. No more circling blocks looking for a spot!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/avatar.jpg" alt="Sarah M." />
                <div className="author-info">
                  <h4>Sarah M.</h4>
                  <p>Daily Commuter</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The app is so intuitive and saves me at least 15 minutes
                  every day. Worth every penny of the subscription."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/avatar.jpg" alt="James L." />
                <div className="author-info">
                  <h4>James L.</h4>
                  <p>Business Professional</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Perfect for weekend shopping trips. I can book ahead and know
                  exactly where I'm parking when I arrive."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/avatar.jpg" alt="Maria R." />
                <div className="author-info">
                  <h4>Maria R.</h4>
                  <p>Weekend Shopper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your Parking Experience?
            </h2>
            <p className="cta-text">
              Join thousands of drivers who have already discovered the
              convenience of smart parking
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Download App Now</button>
              <button className="btn-secondary">View Pricing</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Individual;
