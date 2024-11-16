import React from 'react';

const Testimonial = () => {
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="section-title text-center">
          <h1 className="display-5 mb-5">Chủ Nhà Hàng </h1>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-item text-center">
            <img className="img-fluid bg-light p-2 mx-auto mb-3" src="src/assets/img/testimonial-1.jpg" style={{ width: '90px', height: '90px' }} alt="Chủ nhà hàng" />
            <div className="testimonial-text text-center p-4">
              <p>Chúng tôi luôn cố gắng mang đến những trải nghiệm ẩm thực tuyệt vời nhất cho khách hàng, từ hương vị món ăn đến dịch vụ tận tâm và không gian thoải mái.</p>
              <h5 className="mb-1">Lê Thị B</h5>
              <span className="fst-italic">Chủ Nhà Hàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
