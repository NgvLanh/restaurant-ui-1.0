const Reservation = () => {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container quote px-lg-0">
                <div className="row g-0 mx-lg-5">
                    <div className="col-lg-6 ps-lg-0 wow fadeIn" style={{ minHeight: '400px' }}>
                        <div className="position-relative h-100">
                            <img className="position-absolute img-fluid w-100 h-100" src="src/assets/img/quote.jpg" style={{ objectFit: 'cover' }} alt="Restaurant Dining" />
                        </div>
                    </div>
                    <div className="col-lg-6 quote-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Đặt Bàn Tại Nhà Hàng</h1>
                            </div>
                            <p className="mb-4 pb-2">Vui lòng điền thông tin bên dưới để đặt bàn. Chúng tôi sẽ xác nhận thông tin đặt bàn của bạn sớm nhất có thể.</p>
                            <form>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <input type="text" className="form-control border-0" placeholder="Tên Của Bạn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="email" className="form-control border-0" placeholder="Email Của Bạn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="text" className="form-control border-0" placeholder="Số Điện Thoại" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="date" className="form-control border-0" placeholder="Ngày Đặt Bàn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <input type="time" className="form-control border-0" placeholder="Giờ Đặt Bàn" style={{ height: '55px' }} />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <select className="form-select border-0" style={{ height: '55px' }}>
                                            <option selected>Chọn Số Lượng Người</option>
                                            <option value="1">1 Người</option>
                                            <option value="2">2 Người</option>
                                            <option value="3">3 Người</option>
                                            <option value="4">4 Người</option>
                                            <option value="5">5 Người</option>
                                            <option value="6">6 Người</option>
                                            <option value="7">7 Người</option>
                                            <option value="8">8 Người</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control border-0" placeholder="Yêu Cầu Đặc Biệt (nếu có)"></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Đặt Bàn</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
