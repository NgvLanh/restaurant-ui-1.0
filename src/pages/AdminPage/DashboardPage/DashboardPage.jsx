import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import SalesChart from "../../../components/Admin/SalesChart/SalesChart";
import { FaRegNewspaper, FaUtensils } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { CiMoneyCheck1 } from "react-icons/ci";
import "./DashboardPage.css"; // Tạo một file CSS để quản lý các style tùy chỉnh
import { getTotalRevenue, getTotalDishes, getTotalUsers, getTotalOrders, getTotalOrdersCanCelled } from "../../../services/DashboardService/DashboardService";
import { getAllOrders } from "../../../services/OrderService/OrderService";
import { formatCurrency, formatDateTime } from "../../../utils/FormatUtils";

const DashboardPage = () => {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalDishes, setTotalDishes] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);
    const [orders, setOrders] = useState(null);
    const [totalOrdersCancelled, setTotalOrdersCancelled] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await getAllOrders();
            setOrders(response?.data?.content);
        };

        const fetchTotalRevenue = async () => {
            const revenueResponse = await getTotalRevenue();
            if (revenueResponse) {
                setTotalRevenue(revenueResponse);
            }
        };

        const fetchTotalDishes = async () => {
            const dishesResponse = await getTotalDishes();
            if (dishesResponse) {
                setTotalDishes(dishesResponse);
            }
        };

        const fetchTotalUsers = async () => {
            const usersResponse = await getTotalUsers();
            if (usersResponse) {
                setTotalUsers(usersResponse);
            }
        };

        const fetchTotalOdrers = async () => {
            const ordersResponse = await getTotalOrders();
            if (ordersResponse) {
                setTotalOrders(ordersResponse);
            }
        };
        const fetchTotalOdrersCancelled = async () => {
            const ordersCancelledResponse = await getTotalOrdersCanCelled();
            if (ordersCancelledResponse) {
                setTotalOrdersCancelled(ordersCancelledResponse);
            }
        };
        fetchTotalRevenue();
        fetchTotalDishes();
        fetchTotalUsers();
        fetchTotalOdrers();
        fetchTotalOdrersCancelled();
        fetchOrder();
    }, []);


    return (
        <>
            <PageHeader title="Bảng điều khiển" />

            {/* Thông tin tổng quan */}
            <div className="overview-container mt-4">
                <div className="overview-card">
                    <div className="icon">
                        <FaRegNewspaper />
                    </div>
                    <div className="info">
                        <h3>
                            {totalOrders != null
                                ? totalOrders?.toLocaleString()
                                : 'Đang tải...'}
                        </h3>
                        <p>Đơn hàng đã hoàn thành</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <IoPeopleOutline />
                    </div>
                    <div className="info">
                        <h3>
                            {totalUsers != null
                                ? totalUsers?.toLocaleString()
                                : 'Đang tải...'}
                        </h3>
                        <p>Số lượng người đăng ký</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <CiMoneyCheck1 />
                    </div>
                    <div className="info">
                        <h3>
                            {totalRevenue != null
                                ? totalRevenue?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                : 'Đang tải...'}
                        </h3>
                        <p>Tổng doanh thu đơn hàng đã giao/đã thanh toán</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <FaUtensils />
                    </div>
                    <div className="info">
                        <h3>
                            {totalDishes != null
                                ? totalDishes?.toLocaleString()
                                : 'Đang tải...'}
                        </h3>
                        <p>Tổng số món ăn</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <FaUtensils />
                    </div>
                    <div className="info">
                        <h3>
                            {totalOrdersCancelled != null
                                ? totalOrdersCancelled?.toLocaleString()
                                : 'Đang tải...'}
                        </h3>
                        <p>Đơn hàng đã hủy</p>
                    </div>
                </div>
            </div>

            {/* Biểu đồ và hoá đơn gần đây */}
            <div className="mt-4 row">
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Biểu đồ</Card.Title>
                            <Card.Subtitle>01/{new Date().getFullYear()} - 12/{new Date().getFullYear()}</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <SalesChart />
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Doanh thu theo tháng
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Hoá đơn gần đây</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời gian</th>
                                        <th>Số tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Loại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.length > 0 ? (
                                        orders
                                            ?.slice(-5)
                                            ?.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{formatDateTime(row.time)}</td>
                                                    <td>{formatCurrency(row.total)}</td>
                                                    <td className="d-flex align-items-center">
                                                        <span className={`badge px-2 py-3 rounded-3 ${row.orderStatus === 'PAID' ? 'bg-success' :
                                                            row.orderStatus === 'PENDING' ? 'bg-warning text-dark' :
                                                                row.orderStatus === 'CONFIRMED' ? 'bg-primary' :
                                                                    row.orderStatus === 'CANCELLED' ? 'bg-danger' :
                                                                        row.orderStatus === 'READY_TO_SERVE' ? 'bg-info text-dark' :
                                                                            'bg-secondary'}`}>
                                                            {row.orderStatus === 'PAID' ? 'Đã thanh toán' :
                                                                row.orderStatus === 'PENDING' ? 'Chờ xác nhận' :
                                                                    row.orderStatus === 'CONFIRMED' ? 'Đã xác nhận' :
                                                                        row.orderStatus === 'CANCELLED' ? 'Đã huỷ' :
                                                                            row.orderStatus === 'READY_TO_SERVE' ? 'Đang phục vụ' :
                                                                                'Không xác định'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {row?.address != null ? 'Mua hàng' : 'Ăn tại quán'}
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">Không có dữ liệu</td>
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </>
    );
}

export default DashboardPage;
