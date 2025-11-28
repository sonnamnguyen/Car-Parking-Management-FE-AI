import React from "react";
import "../css/aboutus.css";

const AboutUs: React.FC = () => (
  <div className="about-container">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">About Parkin</h1>
        <p className="hero-subtitle">
          Revolutionizing urban mobility with smart parking solutions
        </p>
      </div>
    </section>

    {/* Our Story Section */}
    <section className="story-section">
      <div className="container">
        <div className="content-grid">
          <div className="text-content">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Parkin was founded with a simple mission: to eliminate the stress
              of finding parking. We recognized that parking is one of the most
              frustrating aspects of urban life, causing unnecessary stress,
              wasted time, and increased pollution.
            </p>
            <p className="section-text">
              Our team of innovators and technologists came together to create a
              comprehensive parking ecosystem that connects drivers with
              available spaces, optimizes urban infrastructure, and creates new
              revenue opportunities for property owners.
            </p>
          </div>
          <div className="image-content">
            <img
              src="/aboutusiamge.jpg"
              alt="Parkin Story"
              className="story-image"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Values Section */}
    <section className="values-section">
      <div className="container">
        <h2 className="section-title">Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon innovation-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="#00D4AA"
                />
                <path
                  d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z"
                  fill="#1a5a5a"
                />
                <path
                  d="M5 6L5.74 8.74L8.5 9.5L5.74 10.26L5 13L4.26 10.26L1.5 9.5L4.26 8.74L5 6Z"
                  fill="#00D4AA"
                />
              </svg>
            </div>
            <h4 className="value-title">Innovation</h4>
            <p className="value-text">
              We constantly push boundaries with cutting-edge technology and
              creative solutions.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon trust-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L14 4.5V7H10V4.5L9 4L3 7V9H4V14C4 15.1 4.9 16 6 16H8V22H10V16H14V22H16V16H18C19.1 16 20 15.1 20 14V9H21Z"
                  fill="#1a5a5a"
                />
                <path
                  d="M12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8Z"
                  fill="#00D4AA"
                />
              </svg>
            </div>
            <h4 className="value-title">Trust</h4>
            <p className="value-text">
              We build reliable partnerships with our users, property owners,
              and communities.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon sustainability-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.16 20C10.53 20 12.64 18.61 13.71 16.5C14.78 18.61 16.89 20 19.26 20C19.78 20 20.28 19.87 20.76 19.7L21.71 22L23.6 21.34C21.96 17.17 20.05 11.95 17 8Z"
                  fill="#00D4AA"
                />
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="#1a5a5a"
                />
                <circle cx="8.5" cy="12.5" r="1.5" fill="#00D4AA" />
                <circle cx="15.5" cy="12.5" r="1.5" fill="#00D4AA" />
              </svg>
            </div>
            <h4 className="value-title">Sustainability</h4>
            <p className="value-text">
              We're committed to reducing environmental impact through smarter
              urban planning.
            </p>
          </div>
          <div className="value-item">
            <div className="value-icon efficiency-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L8.5 8.5L1 9L8.5 9.5L13 17L17.5 9.5L25 9L17.5 8.5L13 1Z"
                  fill="#00D4AA"
                />
                <path
                  d="M13 3L15.5 8L20 8.5L15.5 9L13 14L10.5 9L6 8.5L10.5 8L13 3Z"
                  fill="#1a5a5a"
                />
                <circle cx="13" cy="8.5" r="2" fill="#ffffff" />
              </svg>
            </div>
            <h4 className="value-title">Efficiency</h4>
            <p className="value-text">
              We optimize every interaction to save time and resources for all
              stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
    {/* Mission & Vision Section */}
    <section className="mission-section">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-card">
            <div className="mission-image">
              <img
                src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Car in parking garage"
              />
              <div className="mission-overlay">
                <h3 className="card-title">Our Mission</h3>
                <p className="card-text">
                  Connecting spaces of every journey to elevate livability.
                </p>
              </div>
            </div>
          </div>
          <div className="vision-card">
            <div className="vision-image">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Underground parking garage"
              />
              <div className="vision-overlay">
                <h3 className="card-title">Our Vision</h3>
                <p className="card-text">
                  Creating leading solutions for urban mobility and space
                  management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-subtitle">
          A diverse group of passionate professionals dedicated to transforming
          urban mobility
        </p>
        <div className="team-grid">
          <div className="team-member">
            <h4 className="team-name">Sarah Johnson</h4>
            <p className="team-role">Chief Executive Officer</p>
            <p className="team-bio">
              Former urban planning director with 15+ years experience in smart
              city initiatives.
            </p>
          </div>
          <div className="team-member">
            <h4 className="team-name">Michael Chen</h4>
            <p className="team-role">Chief Technology Officer</p>
            <p className="team-bio">
              AI and IoT expert who previously led innovation at leading tech
              companies.
            </p>
          </div>
          <div className="team-member">
            <h4 className="team-name">Emily Rodriguez</h4>
            <p className="team-role">Chief Operating Officer</p>
            <p className="team-bio">
              Operations specialist with expertise in scaling technology
              platforms globally.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Statistics Section */}
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Parking Spaces</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Cities</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Hours Saved</div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="aboutus-cta-section">
      <div className="container">
        <h2 className="aboutus-cta-title">
          Ready to Transform Your Parking Experience?
        </h2>
        <p className="aboutus-cta-text">
          Join thousands of drivers who have already discovered the future of
          parking
        </p>
        <div className="aboutus-cta-buttons">
          <button className="aboutus-cta-btn primary">Download App</button>
          <button className="aboutus-cta-btn secondary">Contact Us</button>
        </div>
      </div>
    </section>
  </div>
);

export default AboutUs;
