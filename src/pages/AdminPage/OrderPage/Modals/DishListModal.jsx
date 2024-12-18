import { Modal, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "../../../../utils/FormatUtils";
import { createOrderItem, deleteOrderItem, updateQuantityOrderItem } from "../../../../services/OrderItemService/OrderItemService";
import AlertUtils from "../../../../utils/AlertUtils";
import { getAllOrders, getAllOrdersWithTable, updateServedOrder } from "../../../../services/OrderService/OrderService";
import { IoMdClose } from "react-icons/io";
import { getAllDishesByCategoryId } from "../../../../services/DishService/DishService";
import { getAllCategories } from "../../../../services/CategoryService/CategoryService";

const DishListModal = ({ showDetailsModal, setShowDetailsModal, selectTables }) => {
    const [cart, setCart] = useState(selectTables[0]?.reservations?.
        order?.id.orderItems || []);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [dishes, setDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        fetchOrder();
        fetchCategories();
    }, [showDetailsModal]);

    useEffect(() => {
        fetchDishByCategoryId(selectedCategory);
    }, [selectedCategory]);


    const fetchCategories = async () => {
        const response = await getAllCategories();
        setCategories(response);
    }

    const fetchDishByCategoryId = async (categoryId) => {
        const response = await getAllDishesByCategoryId(categoryId);
        setDishes(response);
    }

    const fetchOrder = async () => {
        const response = await getAllOrders();
        const current = response.data.content.find(e => e.id === parseInt(selectTables[0]?.reservations[0]?.order?.id));
        setCart(current?.orderItems);

    }


    const addToCart = async (dish) => {
        const request = {
            quantity: 1,
            price: dish.price,
            orderId: selectTables[0]?.reservations[0]?.order?.id,
            dishId: dish.id
        };

        try {
            const response = await createOrderItem(request);
            if (response.status) {
                console.log(`Thêm thành công`);
            }
            fetchOrder();
        } catch (error) {
            AlertUtils.error(`Lỗi thêm món ăn`, error);
        }
    };

    const removeFromCart = async (orderId) => {
        try {
            const response = await deleteOrderItem(orderId);
            if (response.status) {
                console.log(`Xoá thành công`);
                fetchOrder();
            }
        } catch (error) {
            AlertUtils.error(`Lỗi xoá món ăn`, error);
        }
    };

    const updateQuantity = async (orderId, quantity) => {
        if (quantity != 0) {
            try {
                const response = await updateQuantityOrderItem(orderId, quantity);
                if (response.status) {
                    console.log(`Cập nhật sl thành công`);
                    fetchOrder();
                }
            } catch (error) {
                AlertUtils.info(error.response?.data?.message);
            }
        }
    };


    const calculateTotal = () => {
        const total = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total - discount;
    };

    const handleCheckout = async () => {
        try {
            const response = await updateServedOrder(selectTables[0]?.reservations[0]?.order?.id, calculateTotal());
            if (response.status) {
                AlertUtils.success(`Thanh toán thành công`);
            }
            setShowCheckoutModal(false);
            fetchOrder();
        } catch (error) {
            AlertUtils.error(`Thanh toán lỗi`, error);
        }
    };

    const handleCloseCheckoutModal = () => {
        setShowCheckoutModal(false);
        setShowDetailsModal(true);
    };

    return (
        <>
            {/* Dish List Modal */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="xl" fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách món ăn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {/* Left Column: Dish List */}
                        <Col lg={9} className="border rounded-3">
                            <div className="row mt-3 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="col-12 text-center">
                                    <ul className="list-inline mb-5" id="portfolio-flters">
                                        <li className={`mx-2 ${selectedCategory === 0 ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(0)}
                                        >
                                            Tất cả</li>
                                        {categories?.map((category) => (
                                            <li key={category?.id}
                                                className={`mx-2 ${selectedCategory === category.id ? 'active' : ''}`}
                                                onClick={() => setSelectedCategory(category?.id)}
                                            >{category?.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="row g-4 portfolio-container d-flex flex-wrap">
                                {dishes?.map((dish) => (
                                    <div
                                        key={dish?.id}
                                        className="portfolio-item col-lg-2 col-md-3 wow fadeInUp mt-3"
                                        data-wow-delay="0.1s"
                                    >
                                        <div
                                            className="rounded overflow-hidden d-flex flex-column"
                                            style={{ height: '100%' }}
                                        >
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    className="img-fluid w-100 rounded-3"
                                                    src={dish?.image}
                                                    alt={dish?.image}
                                                    style={{
                                                        height: '100%',
                                                        minHeight: '150px',
                                                        maxHeight: '150px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <div className="portfolio-overlay">
                                                    <a
                                                        className="btn btn-square btn-outline-light mx-1"
                                                        onClick={() => {
                                                            addToCart(dish);
                                                        }}
                                                    >
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className="border border-5 border-light border-top-0 p-4 flex-grow-1"
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <p className="text-primary mb-2">{dish?.category?.name}</p>
                                                <p className="d-flex flex-column gap-2">
                                                    <h6 className="lh-base mb-0">{dish?.name}</h6>
                                                    <span>{formatCurrency(dish?.price)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* Right Column: Cart */}
                        <Col lg={3}>
                            <Card className="p-3 rounded-3">
                                <h5>Giỏ hàng</h5>
                                {cart?.length > 0 ? (
                                    <div>
                                        {cart?.map(item => (
                                            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={`http://localhost:8080/api/files/${item.dish?.image}`}
                                                        alt={item.name}
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            objectFit: "cover",
                                                            marginRight: "10px"
                                                        }}
                                                        className="rounded-3"
                                                    />
                                                    <div>
                                                        <strong>{item.dish?.name}</strong><br />

                                                        <small>{item.quantity} x {formatCurrency(item.price)} (Kho {item.dish.quantity})</small>
                                                    </div>
                                                </div>

                                                <div className="border">
                                                    <Button variant="ghost"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                                                    <Button variant="ghost"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                                                    <Button variant="ghost"
                                                        onClick={() => removeFromCart(item.id)}>
                                                        <IoMdClose color="red" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <strong>Tổng tiền:</strong>
                                            <span>{calculateTotal().toLocaleString('vi-VN')} đ</span>
                                        </div>
                                        {/* <div className="d-flex justify-content-between">
                                            <strong>Giảm giá:</strong>
                                            <Form.Control
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(Number(e.target.value))}
                                                placeholder="Nhập giảm giá"
                                            />
                                        </div> */}
                                        <Button
                                            variant="success"
                                            className="w-100 mt-3"
                                            onClick={() => {
                                                setShowCheckoutModal(true);
                                                setShowDetailsModal(false);
                                            }}
                                        >
                                            Thanh toán
                                        </Button>
                                    </div>
                                ) : (
                                    <p>Giỏ hàng trống.</p>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Checkout Modal */}
            <Modal show={showCheckoutModal} onHide={handleCloseCheckoutModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết hóa đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Chi tiết hóa đơn</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dữ liệu hóa đơn */}
                            {cart?.length > 0 && cart?.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.dish?.name}</td>
                                    <td>{row.quantity}</td>
                                    <td>{formatCurrency(row.price)}</td>
                                    <td>{formatCurrency(row.price * row.quantity)}</td>
                                </tr>
                            ))}

                            {/* Thêm các sản phẩm vào đây */}
                            <tr>
                                <td colSpan={4} className="text-right"><strong>Tổng cộng</strong></td>
                                <td><strong>{formatCurrency(calculateTotal())}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCheckoutModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCheckout}>
                        Thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DishListModal;
