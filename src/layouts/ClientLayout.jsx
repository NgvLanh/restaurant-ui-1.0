import { Outlet } from "react-router-dom"
import Navbar from "../components/Client/Navbar/Navbar"
import Topbar from "../components/Client/topbar/Topbar"
import Spinner from "../components/Client/Spinner/Spinner"
const ClientLayout = () => {
    return (
        <>
            {/* Spinner Start */}
            <Spinner />
            {/* Spinner End */}
            <Topbar />
            <Navbar />
            <Outlet />

        </>
    )
}

export default ClientLayout