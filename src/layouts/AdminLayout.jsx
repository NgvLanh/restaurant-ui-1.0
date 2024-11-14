import { Outlet } from "react-router-dom"
import Navbar from "../components/Client/Navbar/Navbar"
import Spinner from "../components/Client/Spinner/Spinner"
import Sidebar from "../components/Admin/Sidebar/Sidebar"
import { Header } from "../components/Admin/Header/Header"
import { useState } from "react"

const AdminLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <>
            {/* Spinner Start */}
            <Spinner />
            <div className="d-flex">
                <Sidebar isCollapsed={isCollapsed} />
                <div className="mt-3 w-100" style={{ flex: 1 }}>
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="mt-4 px-5">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminLayout