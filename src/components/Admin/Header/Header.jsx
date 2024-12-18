import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const breadcrumbMap = {
    '/admin': 'Trang chủ',
    '/admin/branch': 'Chi nhánh',
    '/admin/branch/status': 'Trạng thái',
    '/admin/dining-table': 'Bàn ăn',
    '/admin/dining-table/status': 'Trạng thái',
    '/admin/dining-table/location': 'Vị trí bàn ăn',
    '/admin/reservations': 'Đặt bàn',
    '/admin/reservations/schedule': 'Lịch đặt bàn',
    '/admin/reservations/canceled': 'Huỷ bàn',
    '/admin/reservations/booking-order': 'Đặt bàn - Gọi món',
    '/admin/menu': 'Món ăn',
    '/admin/menu/categories': 'Danh mục món ăn',
    '/admin/orders': 'Đơn hàng',
    '/admin/orders/orders-at-res': 'Tại nhà hàng',
    '/admin/discounts': 'Giảm giá',
    '/admin/discounts/methods': 'Hình thức giảm giá',
    '/admin/settings': 'Cài đặt',
    '/admin/dashboard': 'Dashboard',
    '/admin/statistics': 'Thống kê',
    '/admin/statistical-table': 'Bàn đã đặt',
    '/admin/statistical-customer': 'Khách hàng',
    '/admin/statistical-invoice': 'Tổng hoá đơn',
    '/admin/statistical-branch': 'Tổng chi nhánh',
    '/admin/statistical-discount': 'Tổng giảm giá',
    '/admin/map': 'Bản đồ',
    '/admin/employee': 'Nhân viên',
    '/admin/statistical-today': 'Thống kê hôm nay'
};

export const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(path => path);

    return (
        <header className="d-flex align-items-center h-16 gap-2">
            <Container fluid className="d-flex align-items-center gap-2 px-4">
                <button type="button" className="btn btn-light me-2"
                    onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>

                <div className="border-end pe-3 me-3" style={{ height: "24px" }}></div>

                <Breadcrumb>
                    {pathNames.map((_, index) => {
                        const fullPath = `/${pathNames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathNames.length - 1;
                        const label = breadcrumbMap[fullPath] || pathNames[index];

                        return (
                            <React.Fragment key={fullPath}>
                                <Breadcrumb.Item active={isLast}>
                                    {isLast ? (
                                        <span className="text-capitalize">{label}</span>
                                    ) : (
                                        <Link to={fullPath} className="text-capitalize">
                                            {label}
                                        </Link>
                                    )}
                                </Breadcrumb.Item>
                                {!isLast && <span className="mx-2"><i className="fa fa-angle-right" style={{ opacity: '0.5' }}></i></span>}
                            </React.Fragment>
                        );
                    })}
                </Breadcrumb>
            </Container>
        </header>
    );
};
