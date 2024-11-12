import PageHeader from "../../../components/Client/PageHeader/PageHeader"
import Footer from "../../../components/client/footer/Footer"
import RecoveryPasswordForm from "../../../components/Client/RecoveryPasswordForm/RecoveryPasswordForm"

const ForgotPasswordPage = () => {
    return (
        <>
            <PageHeader title="Khôi phục mật khẩu" />
            <RecoveryPasswordForm />
            <Footer />
        </>
    )
}

export default ForgotPasswordPage