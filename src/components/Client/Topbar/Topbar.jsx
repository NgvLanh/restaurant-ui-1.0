import { useEffect, useState } from "react";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import { Form } from "react-bootstrap";
import { getUserService } from "../../../services/AuthService/AuthService";
import { useNavigate } from "react-router-dom";
import AlertUtils from "../../../utils/AlertUtils";

const Topbar = () => {
  const [branches, setBranches] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBranches();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserService();
      setUserInfo(response);
    } catch (error) {
      AlertUtils.info('Vui lòng đăn nhập lại', 'Phiên bản của bạn đã hết hạn');
      navigate('/login');
    }
  }

  const fetchBranches = async () => {
    const responese = await getAllBranches();
    localStorage.setItem('branch_info', JSON.stringify(responese[0]));
    setBranches(responese);
  }

  const handleChandeBranch = (branchId) => {
    const branch = branches?.find(e => e.id === parseInt(branchId))
    localStorage.setItem('branch_info', JSON.stringify(branch));
  }

  return (
    <div className="container-fluid bg-light p-0">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-4">
            <small className="fa fa-map-marker-alt text-primary me-2"></small>
            {/* <small>Cái Răng, Cần Thơ, Việt Nam</small> */}
            <Form.Select className="rounded-3" style={{ border: 'none' }}
              onChange={(e) => { handleChandeBranch(e.target.value) }}>
              {branches?.length > 0 && branches?.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </Form.Select>
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
