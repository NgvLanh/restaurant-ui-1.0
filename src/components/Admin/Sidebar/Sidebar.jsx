import { useEffect, useState } from "react"
import { NavGeneral } from "../NavGeneral/NavGeneral"
import { NavMain } from "../NavMain/NavMain"
import { NavUser } from "../NavUser/NavUser"
import { SidebarHeader } from "../SidebarHeader/SidebarHeader"
import { getAllBranches } from "../../../services/BranchService/BranchService"

const Sidebar = ({ isCollapsed }) => {

    const [branches, setBranches] = useState([]);
    const getUser = JSON.parse(localStorage.getItem('user_info'));
    const getRoles = getUser?.roles[0];

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        const response = await getAllBranches();
        setBranches(response);
    };

    const data = {
        user: {
            name: "Lanh",
            email: "nguyenlanh121004@gmail.com",
            avatar: "assets/img/banhmi.jpg",
        },
        navMain: [
            ...(getRoles === "ADMIN" ? [
                {
                    title: "Chi nhánh",
                    url: "/admin/branch",
                    icon: <i className="fas fa-code-branch"></i>,
                    isActive: false,
                    items: [
                        {
                            title: "Danh sách chi nhánh",
                            url: "/admin/branch",
                        },
                        {
                            title: "Trạng thái chi nhánh",
                            url: "/admin/branch/status",
                        },
                    ],
                }
            ] : []),
            {
                title: "Bàn ăn",
                url: "/admin/dining-table",
                icon: <i className="fas fa-utensils"></i>,
                isActive: false,
                items: [
                    {
                        title: "Danh sách bàn ăn",
                        url: "/admin/dining-table",
                    },
                    {
                        title: "Vị trí bàn ăn",
                        url: "/admin/dining-table/location",
                    },
                ],
            },
            {
                title: "Đặt bàn",
                url: "/admin/reservations",
                icon: <i className="fas fa-calendar-alt"></i>,
                isActive: false,
                items: [
                    {
                        title: "Lịch đặt bàn",
                        url: "/admin/reservations/schedule",
                    },
                    {
                        title: "Bàn đã huỷ",
                        url: "/admin/reservations/canceled",
                    }
                ],
            },
            {
                title: "Món ăn",
                url: "/admin/menu",
                icon: <i className="fas fa-hotdog"></i>,
                isActive: false,
                items: [
                    {
                        title: "Danh sách món ăn",
                        url: "/admin/menu",
                    },
                    {
                        title: "Danh mục món ăn",
                        url: "/admin/menu/categories",
                    },
                ],
            },
            {
                title: "Đơn hàng",
                url: "/admin/orders",
                icon: <i className="fas fa-file-invoice"></i>,
                items: [
                    {
<<<<<<< Updated upstream
                        title: "Danh sách đơn hàng",
                        url: "/admin/orders",
=======
                        title: "Danh sách hoá đơn dành cho giao hàng",
                        url: "/admin/orders",
                    },
                    {
                        title: "Danh sách hoá đơn dành cho ăn tại nhà hàng",
                        url: "/admin/orders/orders-at-res",
                    },
                    {
                        title: "Thêm hoá đơn",
                        url: "/admin/orders/create-order",
>>>>>>> Stashed changes
                    }
                ],
            },
            {
                title: "Giảm giá",
                url: "/admin/discounts",
                icon: <i className="fas fa-tags"></i>,
                items: [
                    {
                        title: "Phiếu giảm giá",
                        url: "/admin/discounts",
                    }
                ],
            },
            {
                title: "Nhân viên",
                url: "/admin/users",
                icon: <i className="fas fa-user"></i>,
                isActive: false,
                items: [
                    {
                        title: "Danh sách nhân viên",
                        url: "/admin/employee",
                    },
                ],
            },
            {
                title: "Cài đặt",
                url: "/admin/settings",
                icon: <i className="fas fa-cogs"></i>,
                items: [
                    {
                        title: "Chung",
                        url: "/admin/settings",
                    }
                ],
            },
            {
                title: "Thống kê",
                url: "/admin/statistics",
                icon: <i className="fas fa-chart-line"></i>,
                items: [
                    // {
                    //     title: "Thống kê...",
                    //     url: "/admin/settings",
                    // },
                    {
                        title: "Tổng số bàn đã đặt",
                        url: "/admin/statistical-table",
                    },
                    {
                        title: "Tống số khách hàng mới theo tháng",
                        url: "/admin/statistical-customer",
                    },
                    {
                        title: "Tổng số hóa đơn",
                        url: "/admin/statistical-invoice",
                    },
                    {
                        title: "Tổng số chi nhánh",
                        url: "/admin/statistical-branch",
                    },
                    {
                        title: "Tổng số giảm giá hiện có",
                        url: "/admin/statistical-discount",
                    }
                ],
            },
        ],
        projects: [
            {
                name: "Dashboard",
                url: "/admin/dashboard",
                icon: <i className="fas fa-terminal"></i>,
            },
            {
                name: "Thống kê",
                url: "/admin/statistics",
                icon: <i className="fas fa-chart-line"></i>,
            },
            // {
            //     name: "Bản đồ",
            //     url: "/admin/map",
            //     icon: <i className="fas fa-map-marked-alt"></i>,
            // },

        ],
    }

    return (
        <aside id="admin_sidebar" style={{
            width: isCollapsed ? '0' : '250px',
            borderRight: '1px solid lightgray',
            position: 'sticky',
            top: '0',
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            maxHeight: "100vh",
            overflowY: 'auto',
            zIndex: 99,
            transition: 'width .5s ease'
        }}>
            <SidebarHeader teams={branches} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <NavMain items={data.navMain} />
                <NavGeneral projects={data.projects} />
            </div>
            <div style={{ marginTop: "auto" }}>
                <NavUser user={data.user} />
            </div>
        </aside>
    );
}

export default Sidebar