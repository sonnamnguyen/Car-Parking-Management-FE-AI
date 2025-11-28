import React from "react";
import "../css/Investor.css";
import Subscribe from "./Subscribe";

const Investor: React.FC = () => {
  return (
    <>
      <section className="investor-banner">
        <div className="investor-banner-wrap">
          <div className="investor-banner-container">
            <div className="investor-banner-content">
              <div className="inner-banner-content-wrap">
                <h1>Unlock Growth Potential Invest in Parkin AI's Future</h1>
                <h2>Join us in shaping the future of parking in Dubai.</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="investor-right-line"></div>
        <div className="investor-bottom-line"></div>
      </section>

      <section className="investors-glance">
        <div className="container">
          <div className="investors-glance-item-wrap">
            <div className="investors-glance-item-content">
              <div className="section-title-investors">
                <h3 className="main-title-investors">
                  Who we are and what we do…
                </h3>
                <div>
                  <p className="p1">
                    With a unique blend of operational excellence, technological
                    know-how and enforcement capability spanning almost three
                    decades, Parkin Company PJSC is the largest provider of paid
                    public parking facilities and services in the Emirate of
                    Dubai, with a portfolio of approximately{" "}
                    <strong>206k paid parking spaces</strong>, as at year-end
                    2024.
                  </p>
                  <p className="p1">
                    Under a 49-year Concession Agreement with Dubai’s Roads and
                    Transport Authority (RTA), Parkin has the exclusive right to
                    operate a portfolio of public on and off-street parking
                    (c.184k spaces) as well as public multi-storey car parking
                    facilities (c.3k spaces). Parkin also operates certain
                    developer-owned parking facilities through partnership
                    agreements across the Emirate (c.19k spaces) and provides
                    barrierless, ticketless on behalf of Majid Al Futtaim across
                    two malls. Additional revenue streams include enforcement,
                    the issuance of seasonal permits, parking reservations and
                    other commercial activities.
                  </p>
                  <p className="p1">
                    By deploying state-of-the-art digital payment solutions and
                    intelligent parking management systems that utilise
                    artificial intelligence and big data analysis, Parkin’s
                    customers successfully conducted 132m parking transactions
                    in 2024.
                  </p>
                  <p className="p1">
                    Dubai's parking operations were established in 1995 under
                    the Dubai Municipality, before becoming part of the RTA in
                    2005. In December 2023, Parkin Company PJSC was established
                    through the issuance of Law No. 30 of 2023, successfully
                    completing its initial public offering (IPO) on the Dubai
                    Financial Market in March 2024.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default Investor;
