import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import OverviewCard from "../../../components/Admin/OverviewCard/OverviewCard";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import SalesChart from "../../../components/Admin/SalesChart/SalesChart";
import { FaRegNewspaper, FaUtensils } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { CiMoneyCheck1 } from "react-icons/ci";
import "./DashboardPage.css"; // Tạo một file CSS để quản lý các style tùy chỉnh
import { getTotalRevenue, getTotalDishes, getTotalUsers, getTotalOrders } from "../../../services/DashboardService/DashboardService";

const DashboardPage = () => {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalDishes, setTotalDishes] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalOrders, setTotalOrders] = useState(null);

    useEffect(() => {
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
        fetchTotalRevenue();
        fetchTotalDishes();
        fetchTotalUsers();
        fetchTotalOdrers();
    }, []);


    return (
        <>
            <PageHeader title="Bản điều khiển" />

            {/* Thông tin tổng quan */}
            <div className="overview-container mt-4">
                <div className="overview-card">
                    <div className="icon">
                        <FaRegNewspaper />
                    </div>
                    <div className="info">
                        <h3>
                            {totalOrders != null
                                ? totalOrders?.toLocaleString() // Hiển thị số món ăn
                                : 'Đang tải...'}
                        </h3>
                        <p>Tổng số đơn hàng</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <IoPeopleOutline />
                    </div>
                    <div className="info">
                        <h3>
                            {totalUsers != null
                                ? totalUsers?.toLocaleString() // Hiển thị số món ăn
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
                        <p>Tổng doanh thu</p>
                    </div>
                </div>
                <div className="overview-card">
                    <div className="icon">
                        <FaUtensils /> {/* Icon cho món ăn */}
                    </div>
                    <div className="info">
                        <h3>
                            {totalDishes != null
                                ? totalDishes?.toLocaleString() // Hiển thị số món ăn
                                : 'Đang tải...'}
                        </h3>
                        <p>Tổng số món ăn</p>
                    </div>
                </div>
            </div>

            {/* Biểu đồ và hoá đơn gần đây */}
            <div className="mt-4 row">
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Biểu đồ</Card.Title>
                            <Card.Subtitle>01/2024 - 12/2024</Card.Subtitle>
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
                            {/* Hiển thị bảng hóa đơn */}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
