import React from 'react';

const Testimonial = () => {
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="section-title text-center">
          <h1 className="display-5 mb-5">Testimonial</h1>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-item text-center">
            <img className="img-fluid bg-light p-2 mx-auto mb-3" src="src/assets/img/testimonial-1.jpg" style={{ width: '90px', height: '90px' }} alt="" />
            <div className="testimonial-text text-center p-4">
              <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
              <h5 className="mb-1">Client Name</h5>
              <span className="fst-italic">Profession</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
