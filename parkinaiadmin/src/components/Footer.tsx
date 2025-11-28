import React from "react";
import "../css/footer.css";

const Footer: React.FC = () => (
  <footer className="theme-footer" id="download-app">
    <div className="container">
      <div className="footer-wrap">
        <div className="footer-logo">
          <a aria-label="Parkin" title="Navigate to Home" href="/">
            <img
              src="/logoparkin.png"
              alt="Parkin Logo"
              style={{ width: 220, height: "auto" }}
            />
          </a>
          <div className="tagline">Easy Parking Effortless Living</div>
        </div>
        <div className="footer-quick-links">
          <div className="footer-list">
            <h3 className="footer-title">Individuals</h3>
            <a
              className="link-list"
              aria-label="Subscribe"
              href="/subscription"
            >
              Subscribe
            </a>
            <a
              className="link-list"
              aria-label="Pay For Parking"
              href="/pay-for-parking"
            >
              Pay For Parking
            </a>
            <a className="link-list" aria-label="Fines" href="/fines">
              Pay Fines
            </a>
          </div>
          <div className="footer-list">
            <h3 className="footer-title">Investors</h3>
            <a
              className="link-list"
              aria-label="Company Overview"
              href="/investors"
            >
              Company Overview
            </a>
            <a
              className="link-list"
              aria-label="Share price information"
              href="/stock-price"
            >
              Share price information
            </a>
            <a
              className="link-list"
              aria-label="DFM announcements"
              href="/announcements"
            >
              Dubai Financial Market (DFM) Announcements
            </a>
            <a
              className="link-list"
              aria-label="Results, Reports & Presentations"
              href="/reports"
            >
              Results, Reports, and Presentations
            </a>
            <a
              className="link-list"
              aria-label="Corporate Governance"
              href="corporate-governance"
            >
              Corporate Governance
            </a>
            <a
              className="link-list"
              aria-label="Sustainability"
              href="/sustainability"
            >
              Sustainability
            </a>
            <a className="link-list" aria-label="IPO" href="/ipo">
              Initial Public Offering (IPO)
            </a>
            <a
              className="link-list"
              aria-label="IR / Media Enquires"
              href="/ir-media-enquiries"
            >
              Investor Relations (IR) / Media Enquiries
            </a>
          </div>
          <div className="footer-list">
            <h3 className="footer-title">More</h3>
            <a className="link-list" aria-label="AboutUs" href="/about-us">
              About Parkin
            </a>
            <a className="link-list" aria-label="contact-us" href="/contact-us">
              Contact Us
            </a>
            <a
              className="link-list"
              aria-label="parkin-faqs"
              href="/parkin-faqs"
            >
              Parkin FAQs
            </a>
            <a className="link-list" aria-label="blog" href="/blog">
              Blog
            </a>
            <a className="link-list" aria-label="partners" href="/partners">
              Partners
            </a>
            <a className="link-list" aria-label="newsroom" href="/news">
              News Room
            </a>
            <a className="link-list" aria-label="careers" href="/career">
              Careers
            </a>
            <a
              className="link-list"
              aria-label="privacy-policy"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            <a
              className="link-list"
              aria-label="terms-conditions"
              href="/terms-conditions?type=terms-condition"
            >
              Terms & Conditions
            </a>
          </div>
          <div className="footer-list">
            <h3
              className="footer-title"
              style={{ marginBottom: 0, marginRight: 0 }}
            >
              Get the App
            </h3>
            <div
              className="store-icons"
              style={{
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <img
                src="/downloadios.jpg"
                alt="Download on App Store"
                style={{
                  width: "160px",
                  height: "auto",
                  objectFit: "contain",
                  border: "none",
                  margin: "0 auto",
                }}
              />
              <img
                src="/downloadggplay.png"
                alt="Download on Google Play"
                style={{
                  width: "160px",
                  height: "auto",
                  objectFit: "contain",
                  border: "none",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="right-line"></div>
    <div className="bottom-line">
      <div className="container">
        <div className="bottom-line-wrap">
          <div className="copyright">
            © {new Date().getFullYear()} Parkin All rights reserved.
          </div>
          <div className="footer-social">
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              href="https://twitter.com/ParkinUAE"
            >
              {" "}
              <i className="icon-x"> </i>{" "}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              href="https://www.instagram.com/parkinuae/"
            >
              {" "}
              <i className="icon-instagram"> </i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              href="https://www.facebook.com/profile.php?id=61556975150279"
            >
              {" "}
              <i className="icon-facebook-circle"> </i>{" "}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
              href="https://www.linkedin.com/company/parkinuae/"
            >
              {" "}
              <i className="icon-linkedin"> </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
