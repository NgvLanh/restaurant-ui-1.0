import { Modal, Button } from "react-bootstrap";

const SelectActionModal = ({ show, handleClose, handleSelect }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <div className="d-flex justify-content-around">
                    <Button variant="primary"
                        className="rounded-3"
                        onClick={() => handleSelect("addReservation")}>
                        Thêm đặt bàn
                    </Button>
                    <Button variant="secondary"
                        className="rounded-3"
                        onClick={() => handleSelect("addFood")}>
                        Thêm món ăn
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SelectActionModal;
