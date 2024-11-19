import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import OderHistory from "../../../components/Client/OderHistory/OderHistory";

const OderHistoryPage = () => {
    return (
        <>
            <PageHeader title="Lịch sử đơn hàng" />
            <OderHistory />
            <Footer />
        </>
    )
}

export default OderHistoryPage