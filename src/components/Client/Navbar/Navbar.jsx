import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { getUserService } from '../../../services/AuthService/AuthService';
import AlertUtils from '../../../utils/AlertUtils';

const Navbar = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['user_token']);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
    const handleLogout = () => {
        localStorage.clear();
        removeCookie('user_token');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
            <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h2 className="m-0 text-primary">FooDY</h2>
            </Link>
            <button
                type="button"
                className="navbar-toggler me-4"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Trang Chủ</Link>
                    <Link to="/menu" className="nav-item nav-link">Thực đơn</Link>
                    <Link to="/service" className="nav-item nav-link">Dịch Vụ</Link>
                    <Link to="/about" className="nav-item nav-link">Giới thiệu</Link>
                    <Link to="/orderhistory" className="nav-item nav-link">Đơn hàng</Link>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">Khác</Link>
                        <div className="dropdown-menu fade-up m-0">
                            {userInfo ? (
                                <>
                                    <Link to="/shopping-cart" className="dropdown-item">Giỏ Hàng</Link>
                                    <Link to="/dining-table" className="dropdown-item">Bàn của bạn</Link>
                                    <Link to="/account" className="dropdown-item">Tài khoản</Link>
                                    <a href="/home" className="dropdown-item" onClick={handleLogout}>Đăng xuất</a>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="dropdown-item">Đăng Nhập</Link>
                                    <Link to="/register" className="dropdown-item">Đăng Ký</Link>
                                    <Link to="/shopping-cart" className="dropdown-item">Giỏ Hàng</Link>
                                </>
                            )}

                        </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link">Liên Hệ</Link>
                </div>
                <Link to="/reservations" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                    Đặt bàn ngay<i className="fa fa-arrow-right ms-3" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
