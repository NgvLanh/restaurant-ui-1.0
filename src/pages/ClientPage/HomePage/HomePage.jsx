import { useEffect, useState } from "react"
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
import { Button, Modal } from "react-bootstrap"
import AlertUtils from "../../../utils/AlertUtils"
import { getAllBranches } from "../../../services/BranchService/BranchService"

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [branches, setBranches] = useState([]);
    const branchInfo = JSON.parse(localStorage.getItem('branch_info') !== 'undefined' && localStorage.getItem('branch_info'));

    useEffect(() => {
        if (!branchInfo) {
            setShowModal(true);
        }
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await getAllBranches();
            console.log(response);
            setBranches(response || [])
        } catch (error) {
            AlertUtils.error(error);
        }
    }

    const handleClose = () => {
        if (selectedOption) {
            setShowModal(false);
        } else {
            alert("Bạn phải chọn một option!");
        }
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        localStorage.setItem('branch_info', JSON.stringify(option));
        setShowModal(false);
        window.location.reload();
    };

    return (
        <>
            <Carousel />

            <Features />

            <About />

            <Services />

            <More />

            <Menus />

            {/* <Reservation /> */}

            <Teams />

            <Testimonial />

            <Footer />


            {/*  */}
            <Modal show={showModal} onHide={() => setShowModal(false)} className="mt-5"
                backdrop='static' keyboard={false}>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>Chọn một chi nhánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        {branches?.length > 0 ? (branches?.map((branch, index) => (
                            <Button
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    borderColor: selectedOption === branch ? "green" : "#ddd",
                                    borderWidth: '2px',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: selectedOption === branch ? '0 4px 8px rgba(0, 128, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)', // Bóng đổ nhẹ
                                }}
                                key={index}
                                onClick={() => handleSelect(branch)}
                                className="m-2 rounded-3 shadow-lg"
                            >
                                {branch.name}
                            </Button>
                        ))) : (
                            <div className="text-muted">Chưa có chi nhánh nào</div>
                        )}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default HomePage