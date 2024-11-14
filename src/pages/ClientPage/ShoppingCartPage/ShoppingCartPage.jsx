import { useState, useEffect } from "react";
import CartItem from "../../../components/Client/CartItem/CartItem";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import Footer from "../../../components/client/footer/Footer";
import { formatCurrency } from "../../../utils/FormatUtils";
import OrderConfirmationModal from "../../../components/Client/Modals/OrderConfirmationModal";
import AddressModal from "../../../components/Client/Modals/AddressModal";
import { deleteCartItem, getCartItemsByUserId, updateCartItemQuantity, updateSelectAll, updateToggleSelect } from "../../../services/CartItemService/CartItemService";
import { createAddress, getAddressByUserId } from "../../../services/AddressService/AddressService";
import { FaInbox } from "react-icons/fa";
import AlertUtils from "../../../utils/AlertUtils";
import { getUserService } from "../../../services/AuthService/AuthService";

const ShoppingCartPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [localCart, setLocalCart] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [discountCode, setDiscountCode] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);


    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchUserCart();
        }
    }, [userInfo]);

    const fetchUserInfo = async () => {
        const info = await getUserService();
        setUserInfo(info);
    };

    const fetchUserCart = async () => {
        if (userInfo) {
            const items = await getCartItemsByUserId(userInfo?.id);
            setLocalCart(items || []);
            const userAddress = await getAddressByUserId(userInfo?.id);
            setSelectedAddress(userAddress?.find(e => e.defaultAddress === true)?.id);
            setAddresses(userAddress || []);
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart_temps')) || [];
            setLocalCart(storedCart);
        }
    };

    const handleToggleSelect = async (id) => {
        if (userInfo) {
            await updateToggleSelect(id);
            fetchUserCart();
        } else {
            const updateCart = localCart.map(e => {
                if (e.id === id) {
                    return { ...e, status: !e.status };
                }
                return e;
            });
            setLocalCart(updateCart);
            localStorage.setItem('cart_temps', JSON.stringify(updateCart));
        }
        checkAllSelect();
    };

    const handleUpdateQuantity = async (id, quantity) => {
        if (userInfo) {
            await updateCartItemQuantity(id, quantity);
            fetchUserCart();
        } else {
            const updateCart = localCart.map(e => {
                if (e.id === id) {
                    return { ...e, quantity: quantity };
                }
                return e;
            });
            setLocalCart(updateCart);
            localStorage.setItem('cart_temps', JSON.stringify(updateCart));
        }

    };

    const handleRemove = async (id) => {
        if (userInfo) {
            await deleteCartItem(id);
            fetchUserCart();
        } else {
            const updateCart = localCart.filter(e => e.id !== id);
            setLocalCart(updateCart);
            localStorage.setItem('cart_temps', JSON.stringify(updateCart));
        }

    };

    const handleSelectAll = async (checked) => {
        if (userInfo) {
            await updateSelectAll(userInfo?.id, checked);
            fetchUserCart();
        } else {
            const updateCart = localCart.map(e => {
                return { ...e, status: checked };
            });
            setLocalCart(updateCart);
            localStorage.setItem('cart_temps', JSON.stringify(updateCart));
        }
    }

    const checkAllSelect = async () => {
        if (userInfo) {
            const items = await getCartItemsByUserId(userInfo?.id);
            const allChecked = items.every(item => item.status);
            document.getElementById('cart-check').checked = allChecked;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart_temps'));
            const allChecked = cartItems.every(item => item.status);
            document.getElementById('cart-check').checked = allChecked;
        }
    }


    const total = localCart?.reduce((sum, item) => {
        return item.status ? sum + item.dish?.price * item.quantity : sum;
    }, 0);

    const handleApplyDiscount = () => {
        alert(`Áp dụng mã giảm giá: ${discountCode}`);
        // Logic tính giảm giá có thể được thêm ở đây
    };

    const handlePlaceOrder = () => {
        const userAdress = addresses?.find((e) => e.id === parseInt(selectedAddress));
        setSelectedAddress(userAdress);
        const itemCheck = localCart.find(e => e.status === true);
        if (userInfo) {
            if (!itemCheck) {
                AlertUtils.info('Vui lòng chọn 1 món ăn trước khi thanh toán')
            } else {
                setShowOrderModal(true);
            }
        }
    };

    const confirmOrder = (data) => {
        alert('Đặt hàng thành công!');
        console.log(data);
        setShowOrderModal(false);
    };

    return (
        <>
            <PageHeader title="Giỏ hàng" />
            <div className="container my-5">
                <div className="section-title text-start">
                    <h1 className="display-5 mb-5">Giỏ Hàng</h1>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        <input type="checkbox" className="form-check-input" id="cart-check"
                                            onChange={(e) => handleSelectAll(e.target.checked)} />
                                    </th>
                                    <th className="text-center">Hình ảnh</th>
                                    <th className="text-start">Sản phẩm</th>
                                    <th className="text-center">Số lượng</th>
                                    <th className="text-center">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localCart?.length > 0 ? (
                                    <>
                                        {localCart?.map((item, index) => (
                                            <CartItem
                                                key={index + 1}
                                                item={item}
                                                onToggleSelect={handleToggleSelect}
                                                onUpdateQuantity={handleUpdateQuantity}
                                                onRemove={handleRemove}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan={5} className="pt-4 text-muted fs-4">
                                            <FaInbox size={32} className="me-2" /> Giỏ hàng trống
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h4 className="mb-3">Đơn Hàng</h4>
                            <p className="fw-bold">Tổng Cộng: {formatCurrency(total)}</p>

                            <div className="mb-3">
                                <label className="form-label">Địa Chỉ Giao Hàng <a href="/account"><i>Thêm</i></a></label>
                                <select
                                    className="form-select"
                                    value={selectedAddress}
                                    onChange={(e) => setSelectedAddress(e.target.value)}
                                >
                                    {addresses?.length > 0 && addresses?.map((addr, index) => (
                                        <option key={index} value={addr.id}>{addr.address}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Mã Giảm Giá</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập mã giảm giá"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    className="btn btn-secondary mt-2 w-100"
                                    onClick={handleApplyDiscount}
                                >
                                    Áp Dụng
                                </button>
                            </div>

                            <button
                                className="btn btn-primary mt-2 w-100"
                                onClick={handlePlaceOrder}
                            >
                                Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <OrderConfirmationModal
                show={showOrderModal}
                onHide={() => setShowOrderModal(false)}
                onConfirm={confirmOrder}
                cartItems={localCart}
                total={total}
                address={selectedAddress}
            />


        </>
    );
};

export default ShoppingCartPage;
