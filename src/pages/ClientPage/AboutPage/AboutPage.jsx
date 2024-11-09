import About from "../../../components/Client/About/About"
import Features from "../../../components/Client/Feature/Feature"
import Footer from "../../../components/client/footer/Footer"
import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Teams from "../../../components/client/team/Team"

const AboutPage = () => {
    return (
        <>
            <PageHeader title="Về chúng tôi" />
            <Features />
            <About />
            <Teams />
            <Footer />
        </>
    )
}

export default AboutPage