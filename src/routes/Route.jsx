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
import MapPage from "../pages/AdminPage/MapPage/MapPage";

export const router = createBrowserRouter((
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<ClientLayout />}>
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
                {/*  */}
                <Route path="login" element={<LoginPage />} />
                {/*  */}
                <Route path="shopping-cart" element={<ShoppingCartPage />} />
                {/*  */}
                <Route path="dining-table" element={<DiningTablePage />} />

            </Route>
            <Route path="/admin" element={<AdminLayout />}>
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
                    <Route path="schedule" element={<ReservationSchedulePage />} />
                    <Route path="canceled" element={<CancelReservationPage />} />
                </Route>

                <Route path="menu">
                    <Route index element={<MenuListPage />} />
                    <Route path="categories" element={<MenuCategoryPage />} />
                </Route>

                <Route path="orders">
                    <Route index element={<OrderListPage />} />
                </Route>

                <Route path="discounts">
                    <Route index element={<DiscountListPage />} />
                </Route>

                <Route path="settings">
                    <Route index element={<SettingPage />} />
                </Route>

                <Route path="statistics" element={<StatisticPage />} />
                <Route path="map" element={<MapPage />} />

            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Route >
    )
))