import React, { useMemo } from "react";
import ContactForm from "./contactForm";
import dynamic from "next/dynamic";

const ContactUs = () => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("./Map"),
        { ssr: false } // This line is important. It's what prevents server-side render
      ),
    []
  );
  return (
    <section className="book_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>تماس با ما</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form_container">
              <ContactForm />
            </div>
          </div>
          <div className="col-md-6">
            <div className="map_container ">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
