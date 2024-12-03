import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Liên Hệ</h4>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Nhà Hàng, Phố 1, Cần Thơ, Việt Nam</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@nhahang.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Dịch Vụ</h4>
                        <a className="btn btn-link" href="">Đặt Bàn</a>
                        <a className="btn btn-link" href="">Thực Đơn</a>
                        <a className="btn btn-link" href="">Giao Hàng Tận Nơi</a>
                        <a className="btn btn-link" href="">Tổ Chức Tiệc</a>
                        <a className="btn btn-link" href="">Ưu Đãi & Khuyến Mãi</a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Liên Kết Nhanh</h4>
                        <a className="btn btn-link" href="">Về Chúng Tôi</a>
                        <a className="btn btn-link" href="">Liên Hệ</a>
                        <a className="btn btn-link" href="">Chính Sách Bảo Mật</a>
                        <a className="btn btn-link" href="">Điều Khoản & Điều Kiện</a>
                        <a className="btn btn-link" href="">Hỗ Trợ</a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Đăng Ký Nhận Thông Tin</h4>
                        <p>Đừng bỏ lỡ các ưu đãi đặc biệt và thực đơn mới của chúng tôi. Đăng ký để nhận thông tin mới nhất.</p>
                        <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                            <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Email của bạn" />
                            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Đăng Ký</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
