
const More = () => {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container feature px-lg-0">
                <div className="row g-0 mx-lg-5">
                    <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 ps-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Tại Sao Chọn Chúng Tôi</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                Chúng tôi cam kết mang đến trải nghiệm ẩm thực tuyệt vời với dịch vụ chuyên nghiệp và không gian ấm cúng.
                            </p>
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-check fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="mb-2">Chất Lượng</p>
                                            <h5 className="mb-0">Thực Phẩm</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-user-check fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="mb-2">Đội Ngũ</p>
                                            <h5 className="mb-0">Chuyên Nghiệp</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-drafting-compass fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="mb-2">Tư Vấn</p>
                                            <h5 className="mb-0">Thực Đơn</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                            <i className="fa fa-headphones fa-2x text-primary"></i>
                                        </div>
                                        <div className="ms-4">
                                            <p className="mb-2">Dịch Vụ</p>
                                            <h5 className="mb-0">Khách Hàng</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-6 pe-lg-0 wow fadeIn" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute img-fluid w-100 h-100" src="src/assets/img/feature.jpg" style={{ objectFit: 'cover' }} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default More;
