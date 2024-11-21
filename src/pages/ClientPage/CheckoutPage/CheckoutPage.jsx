import { useEffect, useState } from "react";
import Footer from "../../../components/client/footer/Footer";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import { getUserService } from "../../../services/AuthService/AuthService";
import { getAddressByUserId } from "../../../services/AddressService/AddressService";
import { deleteCartItemByUserId, getCartItemsByUserId } from "../../../services/CartItemService/CartItemService";
import { formatCurrency } from "../../../utils/FormatUtils";
import { CiLocationOn } from "react-icons/ci";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import AlertUtils from "../../../utils/AlertUtils";
import { orderOffLineService, orderOnLineService } from "../../../services/OrderService/OrderService";
import { Link, useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { vnPayService } from "../../../services/VnPayService/VnPayService";

const CheckoutPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const discountInfo = JSON.parse(localStorage.getItem('discount_info'));
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [checkoutMethod, setCheckoutMethod] = useState('online');
    const [showModalChangeAddress, setShowModalChangeAddress] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserService();
            setUserInfo(user);

            if (user?.id) {
                const addresses = await getAddressByUserId(user.id);
                setAddresses(addresses);
                setDefaultAddress(addresses?.find((e) => e.defaultAddress) || null);
                const cartItems = await getCartItemsByUserId(user.id) || [];
                if (cartItems?.length == 0) {
                    navigate('/shopping-cart');
                } else {
                    setCartItems(cartItems.filter((item) => item.status));
                }
            }
        };

        fetchData();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.dish?.price * item.quantity, 0);
    }

    const handleOrder = async () => {
        if (!defaultAddress) {
            AlertUtils.info('Bạn chưa cung cấp địa chỉ giao hàng');
            return;
        }
        const result = await AlertUtils.confirm('Bạn có chắn chắn đặt đơn hàng này');
        if (result) {
            const method = checkoutMethod === 'online' ? 'CONFIRMED' : 'PENDING';
            const request = {
                user: userInfo,
                address: defaultAddress,
                branch: JSON.parse(localStorage.getItem('branch_info')),
                discount: discountInfo || null,
                table: null,
                orderStatus: method,
                total: discountInfo?.discountMethod === 'PERCENTAGE'
                    ? calculateTotal() * (1 - discountInfo?.value / 100) + (defaultAddress?.fee || 0)
                    : calculateTotal() + (defaultAddress?.fee || 0) - (discountInfo?.value || 0)
            }
            if (method === 'PENDING') {
                const response = await orderOffLineService(request);
                if (response.status) {
                    AlertUtils?.success('Đặt hàng thành công!');
                    deleteCartItem(userInfo?.id);
                    navigate(0);
                }
            } else if (method === 'CONFIRMED') {
                const response = await orderOnLineService(request);
                const orderId = response.data?.id;
                const data = {
                    orderId: orderId,
                    userId: userInfo?.id,
                    amount: discountInfo?.discountMethod === 'PERCENTAGE'
                        ? calculateTotal() * (1 - discountInfo?.value / 100) + (defaultAddress?.fee || 0)
                        : calculateTotal() + (defaultAddress?.fee || 0) - (discountInfo?.value || 0)
                };
                const res = await vnPayService(data);
                if (res.status) {
                    window.location.href = `${res.data?.url}`;
                }
            }
        }
    }

    const deleteCartItem = async (id) => {
        const response = await deleteCartItemByUserId(id);
        console.log(response);
    }

    return (
        <>
            <PageHeader title="Thanh toán" />
            <div className="container my-5">
                <div className="section-title text-start">
                    <h1 className="display-5 mb-5">Thanh toán</h1>
                </div>
                <div className="row">
                    {/* Địa chỉ nhận hàng */}
                    <div className="col-md-12 pb-3 shadow-sm p-3 rounded-3">
                        <div className="p-3">
                            <div className="text-primary d-flex align-items-center gap-1">
                                <CiLocationOn /> Địa chỉ nhận hàng
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <b>
                                        {defaultAddress?.fullName} <br />
                                        {defaultAddress?.phoneNumber}
                                    </b>
                                </div>
                                <div className="col-md-7">{defaultAddress?.address}</div>
                                <div className="col-md-1">
                                    {defaultAddress?.defaultAddress && <span
                                        style={{
                                            border: "1px solid red",
                                            color: "red",
                                            padding: "4px",
                                        }}
                                    >
                                        Mặc định
                                    </span>}
                                </div>
                                <div className="col-md-1">
                                    <span style={{ color: "blue", cursor: "pointer" }}
                                        onClick={() => setShowModalChangeAddress(true)}>
                                        Thay đổi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách món ăn */}
                    <div className="col-md-12 shadow-sm pt-4 px-5 pb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Món ăn</h6>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                                <small>Đơn giá</small>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                                <small>Số lượng</small>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                                <small>Thành tiền</small>
                            </div>
                        </div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="row mb-3 mt-2">
                                <div className="col-md-6">
                                    <div className="dish-info d-flex gap-3">
                                        <img
                                            src={item.dish?.image}
                                            alt={item.dish?.name}
                                            style={{
                                                minWidth: "200px",
                                                maxWidth: "250px",
                                                minHeight: "100px",
                                                maxHeight: "120px",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <div className="d-flex flex-column mt-2">
                                            <h6>{item.dish?.name}</h6>
                                            <small>{item.dish?.category?.name}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-end">
                                    <small>{formatCurrency(item.dish?.price)}</small>
                                </div>
                                <div className="col-md-2 d-flex justify-content-end">
                                    <small>{item.quantity}</small>
                                </div>
                                <div className="col-md-2 d-flex justify-content-end">
                                    <small>{formatCurrency(item.quantity * item.dish?.price)}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Phương thức thanh toán và tổng tiền */}
                    <div className="col-md-12 d-flex justify-content-between px-5 pt-4">
                        <div>Phương thức thanh toán</div>
                        <div className="d-flex flex-column align-items-start">
                            <div className="input-radio">
                                <input type="radio" value="online" id="online"
                                    onChange={(e) => setCheckoutMethod(e.target.value)}
                                    name="checkout-method" defaultChecked className="form-check-input me-2" />
                                <label htmlFor="online">Thanh toán online</label>
                            </div>
                            <div className="input-radio">
                                <input type="radio" value="offline" id="offline"
                                    onChange={(e) => setCheckoutMethod(e.target.value)}
                                    name="checkout-method" className="form-check-input me-2" />
                                <label htmlFor="offline">Thanh toán khi nhận hàng</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 shadow-sm pt-4 px-5 pb-3 gap-2
                    d-flex justify-content-end flex-column">
                        <div className="text-end">
                            Tổng số tiền ({cartItems.length} món): {formatCurrency(calculateTotal())}
                        </div>
                        <div className="text-end">
                            Phí giao hàng: {formatCurrency(defaultAddress?.fee)}
                        </div>
                        <div className="text-end">
                            Giảm giá:
                            {discountInfo?.discountMethod === 'PERCENTAGE'
                                ? `-${discountInfo?.value}%`
                                : discountInfo?.value
                                    ? `-${formatCurrency(discountInfo?.value)}`
                                    : formatCurrency(0)}
                        </div>

                        <div className="text-end">
                            <div className="fs-5">
                                Tổng thanh toán: {discountInfo?.discountMethod === 'PERCENTAGE'
                                    ? formatCurrency(calculateTotal() * (1 - discountInfo?.value / 100) + (defaultAddress?.fee || 0))
                                    : formatCurrency(calculateTotal() + (defaultAddress?.fee || 0) - (discountInfo?.value || 0))}
                            </div>
                        </div>
                        <div className="text-end">
                            <Button className="px-4 rounded-3" onClick={handleOrder}>Đặt hàng</Button>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />

            {/* Modal đổi địa chỉ */}

            <Modal show={showModalChangeAddress} centered
                onHide={() => setShowModalChangeAddress(false)}>
                <Modal.Header>Địa chỉ của tôi</Modal.Header>
                <Modal.Body>
                    {addresses?.length > 0 &&
                        addresses.map((row) => (
                            <Card key={row.id} className="p-3 border-0 shadow-sm border-bottom">
                                <div className="title d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <input
                                            type="radio"
                                            name="address"
                                            id={`address-${row.id}`}
                                            checked={defaultAddress?.id === row.id}
                                            onChange={() => setDefaultAddress(row)}
                                            className="form-check-input"
                                        />
                                        <span className="fw-bold">{defaultAddress?.fullName}</span> | <small>{defaultAddress?.phoneNumber}</small>
                                    </div>
                                    <div>
                                        <small style={{ color: "blue", cursor: "pointer" }}>Cập nhật</small>
                                    </div>
                                </div>
                                <div className="address ms-4">
                                    <p>
                                        <span>{row.address}</span>
                                    </p>
                                    {row.defaultAddress && (
                                        <small
                                            style={{
                                                border: "1px solid red",
                                                color: "red",
                                                padding: "4px",
                                            }}
                                        >
                                            Mặc định
                                        </small>
                                    )}
                                </div>
                            </Card>
                        ))}
                    <Card className="p-3 border-0 shadow-sm border-bottom">
                        <div className="title d-flex align-items-center justify-content-start">
                            <Link to="/account" className="me-2" > <BsPlus /> Thêm địa chỉ</Link>
                        </div>
                    </Card>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CheckoutPage;
