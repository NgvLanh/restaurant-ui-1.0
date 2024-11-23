import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function NavUser({ user }) {
    const [cookie, setCookie, removeCookie] = useCookies(['user_token']);
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user_info');
        removeCookie('user_token');
        navigate("/home");
    };

    return (
        <Dropdown className="_outline_none d-flex align-items-center w-100">
            <Dropdown.Toggle variant="button" className="d-flex align-items-center 
            justify-content-between w-100 bg-white border-0 p-3 rounded-3">
                <div className="d-flex align-items-center">
                    <Image
                        // src={user.avatar}
                        src="/assets/img/banhmi.jpg"
                        alt={user.fullName}
                        roundedCircle
                        className="me-2"
                        style={{ width: "32px", height: "32px" }}
                    />
                    <div className="d-flex flex-column justify-content-start">
                        <div className="fw-semibold text-truncate text-start" style={{ maxWidth: "120px" }}>
                            {userInfo?.fullName}
                        </div>
                        <div className="text-muted text-truncate text-start" style={{ maxWidth: "120px", fontSize: "0.8em" }}>
                            {userInfo?.email}
                        </div>
                    </div>
                </div>
                <i className="fas fa-angle-up"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu align="start" className="border-1 rounded-3 w-100 overflow-hidden text-wrap">
                <Dropdown.Header>
                    <div className="d-flex align-items-center">
                        <Image
                            // src={user.avatar}
                            src="/assets/img/banhmi.jpg"
                            alt={userInfo?.fullName}
                            roundedCircle
                            className="me-2"
                            style={{ width: "32px", height: "32px" }}
                        />
                        <div>
                            <div className="fw-semibold">{userInfo?.fullName}</div>
                            <div className="text-muted" style={{ fontSize: "0.8em" }}>{userInfo?.email}</div>
                        </div>
                    </div>
                </Dropdown.Header>
                <Dropdown.Item
                    className="py-2 px-3">
                    <i className="far fa-bell me-2"></i>
                    <span style={{ fontSize: "0.8em" }}>
                        Thông báo
                    </span>
                </Dropdown.Item>
                <Dropdown.Item
                    className="py-2 px-3"
                    onClick={logout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    <span style={{ fontSize: "0.8em" }}>
                        Đăng xuất
                    </span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
