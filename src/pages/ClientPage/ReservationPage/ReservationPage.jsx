import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import Reservation from "../../../components/Client/Reservation/Reservation"

const ReservationPage = () => {
    return (
        <>
            <PageHeader title="Đặt bàn" />
            <Reservation />
            <Footer />
        </>
    )
}

export default ReservationPage