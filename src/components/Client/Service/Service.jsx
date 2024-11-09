import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center">
                    <h1 className="display-5 mb-5">Dịch Vụ Của Chúng Tôi</h1>
                </div>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-1.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Ẩm Thực Việt Nam</h4>
                                <p>Khám phá hương vị truyền thống với các món ăn đặc trưng của Việt Nam.</p>
                                <Link to="/vietnamese-cuisine" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-2.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Món Âu</h4>
                                <p>Thưởng thức các món Âu tinh tế, được chế biến từ nguyên liệu tươi ngon.</p>
                                <Link to="/european-cuisine" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-3.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Đồ Uống Đặc Biệt</h4>
                                <p>Đa dạng các loại đồ uống, từ cocktail sáng tạo đến sinh tố tươi mát.</p>
                                <Link to="/special-drinks" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-4.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Tiệc & Sự Kiện</h4>
                                <p>Cung cấp dịch vụ tổ chức tiệc và sự kiện với thực đơn phong phú.</p>
                                <Link to="/events" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-5.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Thực Đơn Chay</h4>
                                <p>Thực đơn chay phong phú, phù hợp cho những ai yêu thích lối sống lành mạnh.</p>
                                <Link to="/vegetarian-menu" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="service-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="src/assets/img/service-6.jpg" alt="" style={{ height: '255px', width: '100%' }} />
                            </div>
                            <div className="p-4 text-center border border-5 border-light border-top-0">
                                <h4 className="mb-3">Giao Hàng Tận Nơi</h4>
                                <p>Dịch vụ giao hàng tận nơi nhanh chóng, đảm bảo món ăn tươi ngon đến từng khách hàng.</p>
                                <Link to="/delivery" className="fw-medium">Đọc Thêm<i className="fa fa-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
