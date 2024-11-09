import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import Services from "../../../components/Client/Service/service"
import Testimonial from "../../../components/client/testimonial/Testimonial"
import Reservation from "../../../components/Client/Reservation/Reservation"

const ServicePage = () => {
    return (
        <>
            <PageHeader title="Dịch vụ" />
            <Services />
            <Testimonial />
            <Footer />
        </>
    )
}

export default ServicePage