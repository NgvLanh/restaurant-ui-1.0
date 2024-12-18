import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import AboutPage from "../pages/ClientPage/AboutPage/AboutPage";
import HomePage from "../pages/ClientPage/HomePage/HomePage";
import NotFoundPage from "../pages/ClientPage/NotFoundPage/NotFoundPage";
import ServicePage from "../pages/ClientPage/ServicePage/ServicePage";
import MenuPage from "../pages/ClientPage/MenuPage/MenuPage";
import ContactPage from "../pages/ClientPage/ContactPage/ContactPage";
import ReservationPage from "../pages/ClientPage/ReservationPage/ReservationPage";
import RegisterPage from "../pages/ClientPage/RegisterPage/RegisterPage";
import LoginPage from "../pages/ClientPage/LoginPage/LoginPage";
import ShoppingCartPage from "../pages/ClientPage/ShoppingCartPage/ShoppingCartPage";
import DiningTablePage from "../pages/ClientPage/DiningTablePage/DiningTablePage";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/AdminPage/DashboardPage/DashboardPage";
import BranchListPage from "../pages/AdminPage/BranchPage/BranchListPage";
import BranchStatusPage from "../pages/AdminPage/BranchPage/BranchStatusPage";
import TableListPage from "../pages/AdminPage/TablePage/TableListPage";
import TableLocationPage from "../pages/AdminPage/TablePage/TableLocationPage";
import ReservationSchedulePage from "../pages/AdminPage/ReservationPage/ReservationSchedulePage";
import CancelReservationPage from "../pages/AdminPage/ReservationPage/CancelReservationPage";
import MenuListPage from "../pages/AdminPage/MenuPage/MenuListPage";
import MenuCategoryPage from "../pages/AdminPage/MenuPage/MenuCategoryPage";
import OrderListPage from "../pages/AdminPage/OrderPage/OrderListPage";
import DiscountListPage from "../pages/AdminPage/DiscountPage/DiscountListPage";
import SettingPage from "../pages/AdminPage/SettingPage/SettingPage";
import StatisticPage from "../pages/AdminPage/StatisticPage/StatisticPage";
import StatisticalTablePage from "../pages/AdminPage/StatisticPage/StatisticalTablePage";
import StatisticalCusSumMonth from "../pages/AdminPage/StatisticPage/StatisticalCusSumMonth";
import StatisticalInvoice from "../pages/AdminPage/StatisticPage/StatisticalInvoice";
import StatisticalBranch from "../pages/AdminPage/StatisticPage/StatisticalBranch";
import StatisticalDiscount from "../pages/AdminPage/StatisticPage/StatisticalDiscount";
import MapPage from "../pages/AdminPage/MapPage/MapPage";
import ProtectRoute from "./ProtectRoute";
import ForgotPasswordPage from "../pages/ClientPage/ForgotPasswordPage/ForgotPasswordPage";
import UserInfoPage from "../pages/ClientPage/UserInfoPage/UserInfoPage";
import EmployeeListPage from "../pages/AdminPage/AccountPage/EmployeeListPage"
import CheckoutPage from "../pages/ClientPage/CheckoutPage/CheckoutPage";
import OrderHistoryPage from "../pages/ClientPage/OrderHistoryPage/OrderHistoryPage";
import CreateOrderPage from "../pages/AdminPage/OrderPage/CreateOrderPage";
import CreateReservationPage from "../pages/AdminPage/ReservationPage/CreateReservationPage";
import ReservationBookingOrderPage from "../pages/AdminPage/ReservationPage/ReservationBookingOrderPage";
import OrderListPageForEatAtRes from "../pages/AdminPage/OrderPage/OrderListPageForEatAtRes";


export const router = createBrowserRouter((
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<ClientLayout />} >
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                {/*  */}
                <Route path="about" element={<AboutPage />} />
                {/*  */}
                <Route path="service" element={<ServicePage />} />
                {/*  */}
                <Route path="menu" element={<MenuPage />} />
                {/*  */}
                <Route path="contact" element={<ContactPage />} />
                {/*  */}
                <Route path="reservations" element={<ReservationPage />} />
                {/*  */}
                <Route path="register" element={<RegisterPage />} />
                {/* */}
                <Route path="order-history" element={<ProtectRoute element={<OrderHistoryPage />} admin={false} />} />
                {/*  */}
                <Route path="login" element={<LoginPage />} />
                {/*  */}
                <Route path="shopping-cart" element={<ShoppingCartPage />} />
                {/*  */}
                <Route path="checkout" element={<ProtectRoute element={<CheckoutPage />} admin={false} />} />
                {/*  */}
                <Route path="dining-table" element={<ProtectRoute element={<DiningTablePage />} admin={false} />} />
                {/*  */}
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                {/*  */}
                <Route path="account" element={<ProtectRoute element={<UserInfoPage />} admin={false} />} />
            </Route>
            <Route path="/admin" element={<ProtectRoute element={<AdminLayout />} />}>
                <Route>
                    <Route index element={<DashboardPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                </Route>

                <Route path="branch">
                    <Route index element={<BranchListPage />} />
                    <Route path="status" element={<BranchStatusPage />} />
                </Route>

                <Route path="dining-table">
                    <Route index element={<TableListPage />} />
                    <Route path="location" element={<TableLocationPage />} />
                </Route>

                <Route path="reservations">
                    <Route index element={<ReservationSchedulePage />} />
                    <Route path="booking-order" element={<ReservationBookingOrderPage />} />
                    <Route path="schedule" element={<ReservationSchedulePage />} />
                    <Route path="create" element={<CreateReservationPage />} />
                    <Route path="canceled" element={<CancelReservationPage />} />
                </Route>
                <Route path="">
                    <Route index element={<EmployeeListPage />} />
                    <Route path="employee" element={<EmployeeListPage />} />
                </Route>
                <Route path="menu">
                    <Route index element={<MenuListPage />} />
                    <Route path="categories" element={<MenuCategoryPage />} />
                </Route>

                <Route path="orders">
                    <Route index element={<OrderListPage />} />
                    <Route path="orders-at-res" element={<OrderListPageForEatAtRes />} />
                    <Route path="create-order" element={<CreateOrderPage />} />
                    <Route path="create-order" element={<CreateOrderPage />} />
                </Route>

                <Route path="discounts">
                    <Route index element={<DiscountListPage />} />
                </Route>

                <Route path="settings">
                    <Route index element={<SettingPage />} />
                </Route>

                <Route path="statistics" element={<StatisticPage />} />
                <Route path="statistical-today" element={<SettingPage />} />
                <Route path="statistical-table" element={<StatisticalTablePage />} />
                <Route path="statistical-customer" element={<StatisticalCusSumMonth />} />
                <Route path="statistical-invoice" element={<StatisticalInvoice />} />
                <Route path="statistical-branch" element={<StatisticalBranch />} />
                <Route path="statistical-discount" element={<StatisticalDiscount />} />
                <Route path="map" element={<MapPage />} />

            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Route >
    )
))