import React, { useState, useEffect, useRef } from "react";
import "../css/homepage.css";
import Chatbot from "./Chatbot";

const bannerSlides = [
  {
    image:
      "https://cms.parkin.ae/sites/default/files/2025-04/Variable-parking-tariff_3.jpg",
    title: "Variable parking tariff",
    subtitle:
      "On 4 April 2025, we’ll roll out a new parking tariff to help you find parking faster, enjoy better access in busy areas, and pay less when demand is low.",
  },
  {
    image:
      "https://cms.parkin.ae/sites/default/files/2025-04/About-Parkin_3_0.jpg",
    title: "Smart Parking for Smart Cities",
    subtitle:
      "ParkIn.AI - The future of parking is here. Hassle-free, secure, and intelligent parking solutions for everyone.",
  },
];

const Homepage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [fade, setFade] = useState(false);

  const handleNext = React.useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
      setFade(false);
    }, 400);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, handleNext]);

  return (
    <div>
      {/* Banner Fade Section */}
      <section className="homepage-banner-carousel">
        <div
          className="homepage-banner-slide"
          style={{
            backgroundImage: `url(${bannerSlides[current].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: fade ? 0 : 1,
          }}
        >
          <div className="homepage-banner-overlay">
            <div className="homepage-banner-slider-content">
              <h1 className="homepage-banner-title">
                {bannerSlides[current].title}
              </h1>
              <h2 className="homepage-banner-desc">
                {bannerSlides[current].subtitle}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* How to Pay for Parking Section */}
      <section className="howtopay-parking">
        <div className="container">
          <div className="homepage-section-title">
            <h3 className="main-title">How to Pay for Parking</h3>
            <div className="content sub-title">
              <p>
                Explore simple and convenient ways to handle your parking
                payments, designed to fit your needs and ensure a seamless
                experience.
              </p>
            </div>
          </div>
          <div className="howtopay-parking-listing">
            <div className="regular slider">
              <a
                className="howtopay-parking-list"
                href="/variable-parking-tariff"
              >
                <div className="howtopay-parking-image">
                  <img
                    alt="Variable parking tariff"
                    title="Variable parking tariff"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2025-04/Variable-Parking-Tariff2_3.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="howtopay-parking-content">
                  <h4>Variable parking tariff</h4>
                  <div className="content">
                    <p>
                      Check parking rates based on zone codes and peak hours to
                      take advantage of variable tariffs so you can plan smarter
                      and save more.
                    </p>
                  </div>
                </div>
                <div className="theme-button-border">Learn More</div>
              </a>
              <a className="howtopay-parking-list" href="/parking-information">
                <div className="howtopay-parking-image">
                  <img
                    alt="Parking Zone Guide"
                    title="Parking Zone Guide"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2025-08/_ANS2164%201.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="howtopay-parking-content">
                  <h4>Parking Zone Guide</h4>
                  <div className="content">
                    <p>
                      Discover zone-specific parking details, including fees and
                      operational hours. Optimise your parking choices and stay
                      informed to avoid fines.
                    </p>
                  </div>
                </div>
                <div className="theme-button-border">Learn More</div>
              </a>
              <a className="howtopay-parking-list" href="/offline-machine">
                <div className="howtopay-parking-image">
                  <img
                    alt="Parkin Machines"
                    title="Parkin Machines"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Offline%20Parkin%20Machine_0.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="howtopay-parking-content">
                  <h4>Parkin Machines</h4>
                  <div className="content">
                    <p>
                      Explore available options and familiarise yourself with
                      how to operate offline parking machines, including the
                      payment processes.
                    </p>
                  </div>
                </div>
                <div className="theme-button-border">Learn More</div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Most Popular Services Section */}
      <section className="most-popular-services">
        <div className="container">
          <div className="homepage-section-title">
            <h4 className="main-title">Explore Our Most Popular Services</h4>
            <p className="content sub-title">
              Unlock convenience and flexibility with Parkin top services.
              Explore seamless options tailored for your ultimate parking ease.
            </p>
          </div>
          <div className="most-popular-services-listing">
            <div className="most-popular-services-slider">
              <a
                className="most-popular-services-list"
                aria-label="Learn More Button"
                href="/fines"
              >
                <div className="most-popular-services-image">
                  <img
                    alt="Parkin fines"
                    title="Image"
                    loading="lazy"
                    width="480"
                    height="232"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2025-02/en.jpg"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="most-popular-services-content">
                  <h4>Pay Parking Fines</h4>
                  <p>
                    Pay and manage your fines effortlessly with the Parkin
                    platform for a smooth parking experience.
                  </p>
                  <div className="theme-button-border">Learn More</div>
                </div>
              </a>
              <a
                className="most-popular-services-list"
                aria-label="Learn More Button"
                href="/pay-for-parking"
              >
                <div className="most-popular-services-image">
                  <img
                    alt="Pay for Parking"
                    title="Pay for Parking"
                    loading="lazy"
                    width="480"
                    height="232"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Pay%20for%20Parking-min_0.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="most-popular-services-content">
                  <h4>Pay for Parking</h4>
                  <p>
                    Choose your parking type and zone to pay instantly or
                    schedule it later with ease.
                  </p>
                  <div className="theme-button-border">Learn More</div>
                </div>
              </a>
              <a
                className="most-popular-services-list"
                aria-label="Learn More Button"
                href="/subscription"
              >
                <div className="most-popular-services-image">
                  <img
                    alt="Subscribe to a Parking"
                    title="Subscribe to a Parking"
                    loading="lazy"
                    width="480"
                    height="232"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Subscribe%20to%20a%20Parking_0.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="most-popular-services-content">
                  <h4>Subscribe to a Parking</h4>
                  <p>
                    Make parking easier with a subscription offering access to
                    designated facilities when needed.
                  </p>
                  <div className="theme-button-border">Learn More</div>
                </div>
              </a>
              {/* Card Coming Soon dùng button thay vì a href="#" */}
              <div
                className="most-popular-services-list"
                aria-label="Coming Soon"
              >
                <div className="most-popular-services-image">
                  <img
                    alt="Get a Permit"
                    title="Get a Permit"
                    loading="lazy"
                    width="480"
                    height="232"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Get%20a%20Permit_0.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="most-popular-services-content">
                  <h4>Get a Permit</h4>
                  <p>
                    Access exclusive parking privileges with permits designed
                    for convenience and comfort.
                  </p>
                  <button
                    className="theme-button-border coming-soon-btn"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Discover the Key to Stress-Free Parking Section */}
      <div className="homepage-discover-the-key-inner-view">
        <div className="homepage-section-title">
          <h3 className="main-title">
            Discover the Key to Stress-Free Parking!
          </h3>
        </div>
        <div className="homepage-discover-the-key-list">
          <div className="homepage-discover-the-key-card">
            <div className="homepage-discover-the-key-card-icon">
              <img
                alt="Seamless Experience"
                title="Seamless Experience"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                src="https://cms.parkin.ae/sites/default/files/2024-08/explore_1.png"
                style={{ color: "transparent" }}
              />
            </div>
            <h4>Seamless Experience</h4>
            <p>Enjoy hassle-free parking with Parkin's intuitive solutions.</p>
          </div>
          <div className="homepage-discover-the-key-card">
            <div className="homepage-discover-the-key-card-icon">
              <img
                alt="Effortless Transactions"
                title="Effortless Transactions"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                src="https://cms.parkin.ae/sites/default/files/2024-08/explore_2.png"
                style={{ color: "transparent" }}
              />
            </div>
            <h4>Effortless Transactions</h4>
            <p>
              Easily manage all your parking needs, from booking to
              subscription, with Parkin user-friendly platform.
            </p>
          </div>
          <div className="homepage-discover-the-key-card">
            <div className="homepage-discover-the-key-card-icon">
              <img
                alt="24/7 Customer Support"
                title="24/7 Customer Support"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                src="https://cms.parkin.ae/sites/default/files/2024-08/explore_3.png"
                style={{ color: "transparent" }}
              />
            </div>
            <h4>24/7 Customer Support</h4>
            <p>
              Get reliable assistance round the clock for all your parking
              needs.
            </p>
          </div>
        </div>
      </div>

      {/* New Feature Section - Overlay Content on Image */}
      <section className="new-feature-section">
        <div className="container">
          <div className="new-feature-image-overlay-wrap">
            <img
              alt="New Feature!"
              title="New Feature!"
              loading="lazy"
              width="1312"
              height="384"
              decoding="async"
              src="https://cms.parkin.ae/sites/default/files/2024-08/new_feature.webp"
              className="new-feature-image"
              style={{
                color: "transparent",
                maxWidth: "100%",
                borderRadius: "16px",
              }}
            />
            <div className="new-feature-overlay-content">
              <h3 className="main-title">New Feature!</h3>
              <p className="sub-title">
                Take control and manage your subscription with ease from your
                Parkin dashboard. Renew your card, Update your vehicle details,
                or modify your subscription terms with just a few clicks.
              </p>
              <a
                className="theme-button-border border-white"
                aria-label="Learn More Button"
                href="/subscription"
              >
                Check it Out
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Convenience Section */}
      <section className="parking-convenience">
        <div className="container">
          <div className="homepage-section-title">
            <h3 className="main-title">
              Personalised Features for the Ultimate Parking Convenience
            </h3>
            <p className="sub-title">
              Seamlessly tailored to your needs, our innovative features
              redefine the parking experience, ensuring smooth transactions,
              streamlined management, and hassle-free payments
            </p>
          </div>
          <div className="parking-convenience-listing">
            <div className="parking-convenience-slider">
              <div className="parking-convenience-list">
                <div className="parking-convenience-image">
                  <img
                    alt="Personalised Notifications"
                    title="Personalised Notifications"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Notify.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="parking-convenience-content">
                  <h4>Personalised Notifications</h4>
                  <p>
                    Stay updated with personalised alerts from Parkin. Get
                    reminders for parking expiration, subscription renewals,
                    timings, exclusive offers, and more, ensuring a smooth and
                    efficient parking experience tailored to your needs.
                  </p>
                </div>
              </div>
              <div className="parking-convenience-list">
                <div className="parking-convenience-image">
                  <img
                    alt="Multi-Vehicle Management"
                    title="Multi-Vehicle Management"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Multi%20Vehicle%20Management.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="parking-convenience-content">
                  <h4>Multi-Vehicle Management</h4>
                  <p>
                    Effortlessly manage parking for all your vehicles and those
                    of your first-degree relatives with our intuitive and
                    easy-to-use tools, designed to accommodate all your parking
                    requirements.
                  </p>
                </div>
              </div>
              <div className="parking-convenience-list">
                <div className="parking-convenience-image">
                  <img
                    alt="Contactless Payments"
                    title="Contactless Payments"
                    loading="lazy"
                    width="416"
                    height="416"
                    decoding="async"
                    src="https://cms.parkin.ae/sites/default/files/2024-12/Contactless%20Payment.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="parking-convenience-content">
                  <h4>Contactless Payments</h4>
                  <p>
                    Experience smooth transactions with Parkin's diverse payment
                    options. Whether you're paying through our app or at the
                    gate, enjoy hassle-free, secure, and convenient parking
                    payments customized to your preference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="need-help">
        <div className="container">
          <div className="need-help-wrap">
            <div className="need-help-text">
              <div className="main-title">Need Help?</div>
              <p className="sub-title">
                We're here for you! If you have any questions or need
                assistance, don't hesitate to reach out. Contact our support
                team for quick and friendly help.
              </p>
            </div>
            <a
              className="theme-button"
              aria-label="Contact Us Button"
              href="/contact-us"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      {/* Add Chatbot at the end */}
      <Chatbot />
    </div>
  );
};

export default Homepage;
