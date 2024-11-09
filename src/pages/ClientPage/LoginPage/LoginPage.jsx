import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import LoginForm from "../../../components/Client/LoginForm/LoginForm"

const LoginPage = () => {
    return (
        <>
            <PageHeader title="Đăng nhập" />
            <LoginForm />
            <Footer />
        </>
    )
}

export default LoginPage