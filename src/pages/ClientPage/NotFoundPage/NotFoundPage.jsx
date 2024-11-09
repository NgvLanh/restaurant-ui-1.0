import Footer from "../../../components/client/footer/Footer"
import NotFound from "../../../components/Client/NotFound/NotFound"
import PageHeader from "../../../components/Client/PageHeader/PageHeader"

const NotFoundPage = () => {
    return (
        <>
            <PageHeader title="Không tìm thấy" />
            <NotFound />
            <Footer />
        </>
    )
}

export default NotFoundPage