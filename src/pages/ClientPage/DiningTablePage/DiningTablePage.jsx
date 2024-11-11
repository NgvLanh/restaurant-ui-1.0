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
        { id: 4, name: 'Món D', description: 'Mô tả món D', price: 25.0, available: true, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Món E', description: 'Mô tả món E', price: 30.0, available: true, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Món F', description: 'Mô tả món F', price: 35.0, available: true, image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Món G', description: 'Mô tả món G', price: 40.0, available: true, image: 'https://via.placeholder.com/150' }
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

    <div className="row d-flex justify-content-between">
        {/* Menu Section */}
        <div className="col-md-7" style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
            margin: "20px 0",
            height: "100%",
        }}>
            <h4 style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "30px",
                color: "#2c3e50",
                textAlign: "center",
                letterSpacing: "2px",
                textTransform: "uppercase",
            }}>
                Thực Đơn Nhà Hàng
            </h4>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                justifyContent: "space-between",
            }}>
                {menuItems.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            width: "calc(33.33% - 20px)",
                            backgroundColor: "#fafafa",
                            borderRadius: "12px",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
                            textAlign: "center",
                            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        {/* Hình ảnh món ăn */}
                        <div style={{
                            height: "200px",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "10px",
                            overflow: "hidden",
                            marginBottom: "20px",
                        }}>
                            <img src={item.image} alt={item.name} style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }} />
                        </div>

                        {/* Thông tin món ăn */}
                        <h5 style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#34495e",
                            marginBottom: "15px",
                            textTransform: "uppercase",
                        }}>
                            {item.name}
                        </h5>
                        <p style={{ fontSize: "14px", color: "#7f8c8d", marginBottom: "15px" }}>
                            {item.description}
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: "700", color: "#27ae60" }}>
                            ${item.price}
                        </p>

                        <button style={{
                            display: "block",
                            width: "100%",
                            padding: "12px",
                            marginTop: "20px",
                            backgroundColor: item.available ? "#27ae60" : "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: item.available ? "pointer" : "not-allowed",
                            transition: "background-color 0.3s ease",
                        }}
                            disabled={!item.available}
                            onClick={() => handleAddToOrder(item)}
                        >
                            {item.available ? "Thêm vào giỏ" : "Hết hàng"}
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Order Summary Section */}
        <div className="col-md-4" style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
            height: "100%",
        }}>
            <h4 style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#2c3e50",
                textAlign: "center",
                textTransform: "uppercase",
            }}>
                Đơn Hàng của bạn
            </h4>
            {orderItems.length > 0 ? (
                <>
                    {orderItems.map((item) => (
                        <div key={item.id} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#fafafa",
                            borderRadius: "8px",
                            padding: "15px",
                            marginBottom: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.02)";
                                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                            }}
                        >
                            <div style={{ flex: "2", fontSize: "16px", color: "#34495e" }}>
                                <h6>{item.name}</h6>
                                <p className="text-muted" style={{ fontSize: "14px" }}>
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                            <div style={{
                                flex: "1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    style={{
                                        width: "60px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        marginRight: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1", textAlign: "right" }}>
                                <button className="btn btn-danger btn-sm"
                                    style={{
                                        fontWeight: "600",
                                        padding: "8px 15px",
                                        backgroundColor: "#e74c3c",
                                        borderColor: "#e74c3c",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleRemoveFromOrder(item.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{
                        textAlign: "right",
                        paddingTop: "20px",
                        borderTop: "2px solid #f0f0f0",
                        marginTop: "20px",
                    }}>
                        <h5 style={{ fontSize: "22px", fontWeight: "700", color: "#27ae60" }}>
                            Tổng Cộng: ${total.toFixed(2)}
                        </h5>
                        <button className="btn btn-primary mt-3"
                            style={{
                                fontSize: "16px",
                                padding: "12px 25px",
                                borderRadius: "8px",
                                backgroundColor: "#3498db",
                                color: "#fff",
                                fontWeight: "bold",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            Gửi Đơn Hàng
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-muted" style={{ textAlign: "center" }}>
                    Chưa có món nào trong đơn hàng.
                </p>
            )}
        </div>
    </div>
</div>

            <Footer />
        </>
    );
};

export default DiningTablePage;