import { useState } from "react"
import { Form, Modal } from "react-bootstrap"
import AlertUtils from "../../../utils/AlertUtils";

const ChooseDiscountModal = ({ showModal, setShowModal, handle }) => {
    const [discountCode, setDiscountCode] = useState(null);

    const handleDiscount = () => {
        if (discountCode == null || discountCode == '') {
            AlertUtils.info('Vui lòng nhập mã giảm giá');
        } else {
            handle(discountCode);
            // discountCode('');
        }
    }

    return (
        <>
            <Modal show={showModal} centered
                onHide={() => setShowModal(false)}
            >
                <Modal.Header className="p-3" closeButton>
                    <Modal.Title>Chọn mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center">
                        <Form.Group
                            className="row align-items-center"
                        >
                            <Form.Label className="col-md-3">
                                <span>Mã giảm giá</span>
                            </Form.Label>
                            <div className="col-md-6" >
                                <input type="text" className="w-100 py-2 px-3 form-control"
                                    onChange={(e) => setDiscountCode(e.target.value)} />
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <button type="button" className="w-100 btn btn-ghost border border-2"
                                    onClick={handleDiscount}>Áp dụng</button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {/* <Modal.Body>
                        <div className="discounts">

                        </div>
                </Modal.Body> */}
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChooseDiscountModal