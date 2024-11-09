import { NavGeneral } from "../NavGeneral/NavGeneral"
import { NavMain } from "../NavMain/NavMain"
import { NavUser } from "../NavUser/NavUser"
import { SidebarHeader } from "../SidebarHeader/SidebarHeader"

const Sidebar = () => {

    const data = {
        user: {
            name: "Lanh",
            email: "nguyenlanh121004@gmail.com",
            avatar: "assets/img/banhmi.jpg",
        },
        teams: [
            {
                name: "Cái Răng, Cần Thơ",
                plan: "Chi nhánh",
            },
            {
                name: "Bình Thuỷ, Cần Thơ",
                plan: "Chi nhánh",
            }
        ],
        navMain: [
            {
                title: "Chi nhánh",
                url: "/admin/branch",
                icon: <i className='fas fa-code-branch'></i>,
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
            },
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
                        title: "Trạng thái bàn ăn (Cân nhắc)",
                        url: "/admin/dining-table/status",
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
                        title: "Danh sách đơn hàng",
                        url: "/admin/orders",
                    },
                    {
                        title: "Trạng thái đơn hàng  (Cân nhắc)",
                        url: "/admin/orders/status",
                    },
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
                    },
                    {
                        title: "Hình thức giảm giá (Cân nhắc)",
                        url: "/admin/discounts/methods",
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
            {
                name: "Bản đồ",
                url: "/admin/map",
                icon: <i className="fas fa-map-marked-alt"></i>,
            },
        ],
    }

    return (
        <aside id="admin_sidebar" style={{
            minWidth: '290px',
            width: '250px',
            borderRight: '1px solid lightgray',
            position: 'sticky',
            top: '0',
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            zIndex: 99
        }}>
            <SidebarHeader teams={data?.teams} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <NavMain items={data.navMain} />
                <NavGeneral projects={data.projects} />
            </div>
            <div style={{ marginTop: "auto" }}>
                <NavUser user={data.user} />
            </div>
        </aside>
    )
}

export default Sidebar