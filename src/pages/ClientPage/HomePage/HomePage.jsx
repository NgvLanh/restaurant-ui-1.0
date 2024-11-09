import About from "../../../components/Client/About/About"
import Carousel from "../../../components/Client/Carousel/Carousel"
import Features from "../../../components/Client/Feature/Feature"
import Footer from "../../../components/client/footer/Footer"
import Menus from "../../../components/Client/Menu/Menu"
import More from "../../../components/Client/More/More"
import Reservation from "../../../components/Client/Reservation/Reservation"
import Services from "../../../components/Client/Service/service"
import Teams from "../../../components/client/team/Team"
import Testimonial from "../../../components/client/testimonial/Testimonial"

const HomePage = () => {
    return (
        <>
            <Carousel />

            <Features />

            <About />

            <Services />

            <More />

            <Menus />

            <Reservation />

            <Teams />

            <Testimonial />

            <Footer />
        </>
    )
}

export default HomePage