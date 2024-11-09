import { useState } from "react";
import MenuItem from "../../../components/Client/MenuItem/MenuItem";
import Footer from "../../../components/client/footer/Footer";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";

const DiningTablePage = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [menuItems] = useState([
        { id: 1, name: 'Món A', description: 'Mô tả món A', price: 12.0, available: true, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Món B', description: 'Mô tả món B', price: 15.0, available: false, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Món C', description: 'Mô tả món C', price: 20.0, available: true, image: 'https://via.placeholder.com/150' },
    ]);

    const [tableDetails] = useState({
        tableNumber: 5,
        seats: 4,
    });

    const handleAddToOrder = (menuItem) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === menuItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...menuItem, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromOrder = (id) => {
        setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item
            )
        );
    };

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <PageHeader title="Bàn ăn của bạn" />
            <div className="container my-5">
                <h2 className="text-center mb-4">Bàn Số {tableDetails.tableNumber}</h2>
                <p className="text-center text-muted">Số ghế: {tableDetails.seats}</p>

                <div className="row">
                    {/* Menu Section */}
                    <div className="col-md-6">
                        <h4>Thực Đơn</h4>
                        <div className="row">
                            {menuItems.map((item) => (
                                <MenuItem key={item.id} item={item} onAdd={handleAddToOrder} />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="col-md-6">
                        <h4>Đơn Hàng của bạn</h4>
                        {orderItems.length > 0 ? (
                            <>
                                {orderItems.map((item) => (
                                    <div key={item.id} className="row align-items-center mb-3">
                                        <div className="col-6">
                                            <h6>{item.name}</h6>
                                            <p className="text-muted">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="col-3">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-3 text-end">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveFromOrder(item.id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-end mt-4">
                                    <h5>Tổng Cộng: ${total.toFixed(2)}</h5>
                                    <button className="btn btn-primary mt-2">Gửi Đơn Hàng</button>
                                </div>
                            </>
                        ) : (
                            <p className="text-muted">Chưa có món nào trong đơn hàng của bạn.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DiningTablePage;