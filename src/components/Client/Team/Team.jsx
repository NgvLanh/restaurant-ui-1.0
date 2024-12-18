const Teams = () => {
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center">
                    <h1 className="display-5 mb-5">Đội Ngũ Nhà Hàng</h1>
                </div>
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="team-item">
                            <div className="overflow-hidden position-relative">
                                <img className="img-fluid" src="src/assets/img/team-1.jpg" alt="Bếp Trưởng" />
                                <div className="team-social">
                                    <a className="btn btn-square" href="https://facebook.com/chef"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square" href="https://twitter.com/chef"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square" href="https://instagram.com/chef"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="text-center border border-5 border-light border-top-0 p-4">
                                <h5 className="mb-0">Nguyễn Văn An</h5>
                                <small>Bếp Trưởng</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="team-item">
                            <div className="overflow-hidden position-relative">
                                <img className="img-fluid" src="src/assets/img/team-2.jpg" alt="Bếp Phó" />
                                <div className="team-social">
                                    <a className="btn btn-square" href="https://facebook.com/souschef"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square" href="https://twitter.com/souschef"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square" href="https://instagram.com/souschef"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="text-center border border-5 border-light border-top-0 p-4">
                                <h5 className="mb-0">Trần Văn Bảo</h5>
                                <small>Bếp Phó</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="team-item">
                            <div className="overflow-hidden position-relative">
                                <img className="img-fluid" src="src/assets/img/team-3.jpg" alt="Quản Lý" />
                                <div className="team-social">
                                    <a className="btn btn-square" href="https://facebook.com/manager"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square" href="https://twitter.com/manager"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square" href="https://instagram.com/manager"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="text-center border border-5 border-light border-top-0 p-4">
                                <h5 className="mb-0">Phạm Văn Cường</h5>
                                <small>Quản Lý</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div className="team-item">
                            <div className="overflow-hidden position-relative">
                                <img className="img-fluid" src="src/assets/img/team-4.jpg" alt="Bartender" />
                                <div className="team-social">
                                    <a className="btn btn-square" href="https://facebook.com/bartender"><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-square" href="https://twitter.com/bartender"><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-square" href="https://instagram.com/bartender"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                            <div className="text-center border border-5 border-light border-top-0 p-4">
                                <h5 className="mb-0">Lê Thị Dịu</h5>
                                <small>Bartender</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;
