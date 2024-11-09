import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container about px-lg-0">
                <div className="row g-0 mx-lg-5">
                    <div className="col-lg-6 ps-lg-0 wow fadeIn" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="src/assets/img/about.jpg"
                                style={{ objectFit: 'cover' }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Về Chúng Tôi</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                Chúng tôi là nhà hàng uy tín với nhiều năm kinh nghiệm, mang đến những món ăn chất lượng và trải nghiệm dịch vụ hoàn hảo. Từ những nguyên liệu tươi ngon nhất đến cách phục vụ tận tâm, chúng tôi luôn mong muốn làm hài lòng mỗi khách hàng.
                            </p>
                            <div className="row g-4 mb-4 pb-2">
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-users fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-3">
                                            <h2 className="text-primary mb-1">5000+</h2>
                                            <p className="fw-medium mb-0">Khách Hàng Hài Lòng</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-utensils fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-3">
                                            <h2 className="text-primary mb-1">200+</h2>
                                            <p className="fw-medium mb-0">Món Ăn Độc Đáo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary py-3 px-5">
                                Khám Phá Thêm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
