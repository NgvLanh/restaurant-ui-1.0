import { Link } from "react-router-dom"

const Carousel = () => {
    return (
        <div className="container-fluid p-0 pb-5">
            <div className="d-flex overflow-hidden header-carousel position-relative">
                <div className="owl-carousel-item position-relative">
                    <img className="img-fluid" src="src/assets/img/carousel-1.jpg" alt="" />
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                        style={{ background: 'rgba(53, 53, 53, 0.7)' }}
                    >
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-8 text-center">
                                    <h5 className="text-white text-uppercase mb-3 animated slideInDown">Chào mừng đến với Nhà Hàng của Chúng Tôi</h5>
                                    <h1 className="display-3 text-white animated slideInDown mb-4">Ẩm Thực Đẳng Cấp & Dịch Vụ Hoàn Hảo</h1>
                                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                                        Trải nghiệm những món ăn tuyệt vời được chế biến từ nguyên liệu tươi ngon nhất, trong không gian ấm cúng và sang trọng. Hãy để chúng tôi mang đến cho bạn một hành trình ẩm thực đáng nhớ.
                                    </p>
                                    <Link to="/about" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Khám Phá Thêm</Link>
                                    <Link to="/reservations" className="btn btn-light py-md-3 px-md-5 animated slideInRight">Đặt Bàn Ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel