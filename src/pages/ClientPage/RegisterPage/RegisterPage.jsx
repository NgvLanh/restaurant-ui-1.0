import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import RegistrationForm from "../../../components/Client/RegistrationForm/RegistrationForm"

const RegisterPage = () => {
    return (
        <>
            <PageHeader title="Đăng ký" />
            <RegistrationForm />
            <Footer />
        </>
    )
}

export default RegisterPage