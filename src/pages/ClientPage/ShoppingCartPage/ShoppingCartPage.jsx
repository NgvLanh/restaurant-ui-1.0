import { useState, useEffect } from "react";
import CartItem from "../../../components/Client/CartItem/CartItem";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import Footer from "../../../components/client/footer/Footer";
import { formatCurrency } from "../../../utils/FormatUtils";
import OrderConfirmationModal from "../../../components/Client/Modals/OrderConfirmationModal";
import AddressModal from "../../../components/Client/Modals/AddressModal";
import { getCartItemsByUserId } from "../../../services/CartItemService/CartItemService";

const ShoppingCartPage = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem('user_addresses')) || []);
    const [selectAll, setSelectAll] = useState(false);
    const [address, setAddress] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);


    const fetchCart = async () => {
        if (userInfo) {
            const items = await getCartItemsByUserId(userInfo?.id);
            setCartItems(items || []); 
        } else {
            setCartItems(JSON.parse(localStorage.getItem('cart_temp')) || []);
        }
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, Math.min(25, newQuantity)) } : item
        );
        setCartItems(updatedItems);
    };

    const handleRemove = (id) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedItems = cartItems.map((item) => ({ ...item, status: newSelectAll }));
        setCartItems(updatedItems);
    };

    const handleToggleSelect = (id, isSelected) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, status: isSelected } : item
        );
        setCartItems(updatedItems);

        // Kiểm tra nếu tất cả item đã được chọn hoặc bỏ chọn
        const allSelected = updatedItems.every((item) => item.status);
        setSelectAll(allSelected);
    };

    // const total = cartItems?.reduce((sum, item) => {
    //     return item.isSelected ? sum + item.price * item.quantity : sum;
    // }, 0);

    const handleApplyDiscount = () => {
        alert(`Áp dụng mã giảm giá: ${discountCode}`);
        // Logic tính giảm giá có thể được thêm ở đây
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            alert("Vui lòng chọn địa chỉ giao hàng!");
            return;
        }
        setShowOrderModal(true);
    };

    const confirmOrder = () => {
        alert('Đặt hàng thành công!');
        setCartItems([]);
        localStorage.removeItem('cart_temp');
        setShowOrderModal(false);
    };

    const handleSaveAddress = (newAddress) => {
        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);
        setSelectedAddress(newAddress);
        localStorage.setItem('user_addresses', JSON.stringify(updatedAddresses));
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
                        <div className="mb-3 d-flex align-items-center">
                            {cartItems?.length > 0 && (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="form-check-input"
                                    />
                                    <label className="ms-2">Chọn tất cả</label>
                                </>
                            )}
                        </div>
                        {cartItems?.length > 0 ? (
                            <>
                                {cartItems?.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={(id, quantity) => handleUpdateQuantity(id, quantity)}
                                        onRemove={handleRemove}
                                        onToggleSelect={handleToggleSelect}
                                    />
                                ))}
                            </>
                        ) : (
                            <p className="text-center">Giỏ hàng của bạn đang trống.</p>
                        )}
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h4 className="mb-3">Tóm Tắt Đơn Hàng</h4>
                            <p className="fw-bold">Tổng Cộng: {formatCurrency(0)}</p>

                            <div className="mb-3">
                                <label className="form-label">Chọn Địa Chỉ Giao Hàng</label>
                                <select
                                    className="form-select"
                                    value={selectedAddress}
                                    onChange={(e) => setSelectedAddress(e.target.value)}
                                >
                                    <option value="">Chọn địa chỉ</option>
                                    {addresses.map((addr, index) => (
                                        <option key={index} value={addr}>{addr}</option>
                                    ))}
                                </select>
                                <button
                                    className="btn btn-secondary mt-2 w-100"
                                    onClick={() => setShowAddressModal(true)}
                                >
                                    Quản Lý Địa Chỉ
                                </button>
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
                cartItems={cartItems}
                total={0}
                address={selectedAddress}
            />

            <AddressModal
                show={showAddressModal}
                onHide={() => setShowAddressModal(false)}
                onSave={handleSaveAddress}
            />
        </>
    );
};

export default ShoppingCartPage;
