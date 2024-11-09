import React from 'react';

const Features = () => {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-utensils fa-2x text-primary"></i>
                            </div>
                            <h1 className="display-1 text-light mb-0">01</h1>
                        </div>
                        <h5>Đầu bếp tài năng</h5>
                    </div>
                    <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-star fa-2x text-primary"></i>
                            </div>
                            <h1 className="display-1 text-light mb-0">02</h1>
                        </div>
                        <h5>Chất lượng món ăn</h5>
                    </div>
                    <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-seedling fa-2x text-primary"></i>
                            </div>
                            <h1 className="display-1 text-light mb-0">03</h1>
                        </div>
                        <h5>Nguyên liệu tươi sạch</h5>
                    </div>
                    <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-concierge-bell fa-2x text-primary"></i>
                            </div>
                            <h1 className="display-1 text-light mb-0">04</h1>
                        </div>
                        <h5>Dịch vụ tận tâm</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
