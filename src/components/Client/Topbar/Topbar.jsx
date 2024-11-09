
const Topbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));

  return (
    <div className="container-fluid bg-light p-0">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-map-marker-alt text-primary me-2"></small>
            <small>Cái Răng, Cần Thơ, Việt Nam</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center py-3">
            <small className="far fa-clock text-primary me-2"></small>
            <small>Thứ Hai - Thứ Sáu: 09:00 AM - 09:00 PM</small>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small>{userInfo ? `Xin chào,  ${userInfo?.fullName}` : `Xin chào quý khách`}</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-phone-alt text-primary me-2"></small>
            <small>+84 345 6789</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center">
            <a className="btn btn-sm-square bg-white text-primary me-1" href="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-sm-square bg-white text-primary me-1" href="">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-sm-square bg-white text-primary me-1" href="">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-sm-square bg-white text-primary me-0" href="">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
