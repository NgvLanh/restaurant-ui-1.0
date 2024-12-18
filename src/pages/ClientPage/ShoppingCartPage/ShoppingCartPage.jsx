import { useState, useEffect } from "react";
import CartItem from "../../../components/Client/CartItem/CartItem";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import Footer from "../../../components/client/footer/Footer";
import { formatCurrency } from "../../../utils/FormatUtils";
import OrderConfirmationModal from "../../../components/Client/Modals/OrderConfirmationModal";

import { deleteCartItem, getCartItemsByUserId, updateCartItemQuantity, updateSelectAll, updateToggleSelect } from "../../../services/CartItemService/CartItemService";
import { getAddressByUserId } from "../../../services/AddressService/AddressService";
import { FaInbox } from "react-icons/fa";
import AlertUtils from "../../../utils/AlertUtils";
import { getUserService } from "../../../services/AuthService/AuthService";
import { json, useNavigate } from "react-router-dom";
import ChooseDiscountModal from "../../../components/Client/ChooseDiscountModal/ChooseDiscountModal";
import { checkDiscount } from "../../../services/DiscountService/DiscountService";

const ShoppingCartPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem('cart_temps')) || []);

    const [addresses, setAddresses] = useState([]);
    const [discount, setDiscount] = useState(JSON.parse(localStorage.getItem('discount_info')) || null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const navigate = useNavigate();


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
            setSelectedAddress(userAddress?.find(e => e.defaultAddress === true));
            if (items?.length > 0) {
                const allChecked = items.every(item => item.status);
                document.getElementById('cart-check').checked = allChecked;
            }
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart_temps')) || [];
            setLocalCart(storedCart);
            if (storedCart?.length > 0) {
                const allChecked = storedCart.every(item => item.status);
                document.getElementById('cart-check').checked = allChecked;
            }
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
            try {
                await updateCartItemQuantity(id, quantity);
                fetchUserCart();
            } catch (error) {
                console.log(error);
                AlertUtils.info(error.response?.data?.message || 'Lỗi không xác định');
            }
        } else {
            if (quantity > 20) {
                AlertUtils.info('Bạn chỉ có thể thêm tối đa là 20 sản phẩm');
                return;
            }

            const updateCart = localCart.map(e => {
                if (e.id === id) {
                    return { ...e, quantity };
                }
                return e;
            });

            setLocalCart(updateCart);
            localStorage.setItem('cart_temps', JSON.stringify(updateCart));
        }
    };


    const handleRemove = async (id) => {
        const result = await AlertUtils.confirm('Bạn có mốn xoá sản phẩm này ra khỏi giỏ hàng?');
        if (result) {
            if (userInfo) {
                const res = await deleteCartItem(id);
                console.log(res);
                fetchUserCart();
            } else {
                const updateCart = localCart.filter(e => e.id !== id);
                setLocalCart(updateCart);
                localStorage.setItem('cart_temps', JSON.stringify(updateCart));
            }
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

    const showDiscount = () => {
        const itemCheck = localCart.find(e => e.status === true);
        if (localCart?.length == 0) {
            AlertUtils.info('Giỏ hàng đang trống');
        } else if (!itemCheck) {
            AlertUtils.info('Vui lòng chọn 1 món ăn trước khi thêm mã giảm giá');
        } else {
            setShowDiscountModal(true)
        }
    };

    const handlePlaceOrder = () => {
        if (userInfo) {
            const userAdress = addresses?.find((e) => e.id === parseInt(selectedAddress));
            setSelectedAddress(userAdress);
            const itemCheck = localCart.find(e => e.status === true);
            if (localCart?.length == 0) {
                AlertUtils.info('Giỏ hàng đang trống');
            } else if (!itemCheck) {
                AlertUtils.info('Vui lòng chọn 1 món ăn trước khi thanh toán');
            } else {
                navigate('/checkout');
            }
        } else {
            AlertUtils.info('Vui lòng đăng nhập để tiếp tục', 'Bạn chưa đăng nhập ');
            navigate('/login');
        }
    };

    const handleDiscount = async (code) => {
        try {
            const response = await checkDiscount(code);
            if (response?.status) {
                if (response.data?.quota > total) {
                    AlertUtils.info(`Hoá đơn từ ${formatCurrency(response.data?.quota)} mới dùng được giảm giá này`);
                } else {
                    AlertUtils.success(`Áp mã giảm giá thành công 
                        ${response?.data?.discountMethod === 'FIXED_AMOUNT'
                            ? `-${formatCurrency(response?.data?.value)}` : `${response?.data?.value}%`} `);
                    localStorage.setItem('discount_info', JSON.stringify(response?.data))
                    setDiscount(response?.data || null);
                }
                setShowDiscountModal(false);
            }
        } catch (error) {
            AlertUtils.info(error.response?.data?.message);
        }

    }


    return (
        <>
            <PageHeader title="Giỏ hàng" />
            <div className="container my-5">
                <div className="section-title text-start">
                    <h1 className="display-5 mb-5">Giỏ Hàng</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                                {localCart?.length > 0 ? localCart?.map((item, index) => (
                                    <CartItem
                                        key={index + 1}
                                        item={item}
                                        onToggleSelect={handleToggleSelect}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemove={handleRemove}
                                    />
                                )) : (
                                    <tr className="text-center">
                                        <td colSpan={5} className="p-5 text-muted fs-4">
                                            <FaInbox size={32} className="me-2" /> Giỏ hàng trống
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {userInfo &&
                                <div className="row mb-2 align-items-center">
                                    <div className="col-md-10 d-flex justify-content-end">
                                        Giảm giá {localCart?.length > 0 && (
                                            discount?.discountMethod === 'FIXED_AMOUNT'
                                                ? `-${formatCurrency(discount?.value)}`
                                                : discount?.discountMethod === 'PERCENTAGE' ? `${discount?.value}%` : ''
                                        )}
                                    </div>
                                    <div className="col-md-2 d-flex justify-content-end">
                                        <button className="btn btn-ghost border border-2 w-100"
                                            onClick={() => showDiscount()}>Nhập mã</button>
                                    </div>
                                </div>}
                            <div className="row mb-2 align-items-center">
                                <div className="col-md-10 d-flex d-flex justify-content-end">
                                    Tổng thanh toán ({localCart?.length} sản phẩm): &nbsp; <span className="text-primary"> {formatCurrency(total)}</span>
                                </div>
                                <div className="col-md-2 d-flex justify-content-end align-items-center">
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
                </div>
            </div>
            <Footer />

            <ChooseDiscountModal
                showModal={showDiscountModal}
                setShowModal={() => setShowDiscountModal(false)}
                handle={handleDiscount}
            />


        </>
    );
};

export default ShoppingCartPage;
