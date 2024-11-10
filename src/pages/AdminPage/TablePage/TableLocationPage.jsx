import React, { useRef, useState, useEffect } from "react";

const CanvasWithDragAndDrop = () => {
    // Tham chiếu đến phần tử canvas
    const canvasRef = useRef(null);

    // Trạng thái các phần tử trong danh sách có thể kéo
    const [items, setItems] = useState([
        { id: 1, size: 100, image: "/assets/img/table.png" },
        { id: 2, size: 100, image: "/assets/img/table.png" },
        { id: 3, size: 100, image: "/assets/img/table.png" },
    ]);

    // Trạng thái các phần tử đã được thả trên canvas
    const [droppedItems, setDroppedItems] = useState([]);
    // Trạng thái thông tin toạ độ
    const [coordinates, setCoordinates] = useState(null);

    // Trạng thái phần tử đang kéo
    const [dragging, setDragging] = useState(null);

    // Vẽ lại canvas khi có sự thay đổi trong droppedItems
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Xóa canvas trước khi vẽ lại
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Vẽ tất cả các phần tử đã thả trên canvas
        droppedItems.forEach(item => {
            const img = new Image();
            img.src = item.image;  // Đặt nguồn hình ảnh

            // Vẽ hình ảnh lên canvas khi hình ảnh đã tải
            img.onload = () => {
                ctx.drawImage(img, item.x, item.y, item.size, item.size);
            };
        });
    }, [droppedItems]);

    // Xử lý khi bắt đầu kéo
    const onDragStart = (e, item) => {
        setDragging(item);
    };

    // Xử lý khi kéo di chuyển
    const onDragOver = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt
    };

    // Kiểm tra nếu vị trí thả có trùng với các phần tử đã thả hay không
    const isOverlapping = (x, y, size) => {
        return droppedItems.some(item => {
            return (
                x < item.x + item.size &&
                x + size > item.x &&
                y < item.y + item.size &&
                y + size > item.y
            );
        });
    };

    // Xử lý khi thả phần tử vào canvas
    const onDrop = (e) => {
        e.preventDefault();
        if (!dragging) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Tính toán vị trí thả trên canvas
        const x = e.clientX - rect.left - dragging.size / 2;
        const y = e.clientY - rect.top - dragging.size / 2;

        // Cập nhật thông tin toạ độ
        setCoordinates({ x, y });

        // Kiểm tra nếu vị trí thả không trùng với các phần tử đã có trên canvas
        if (isOverlapping(x, y, dragging.size)) {
            // Nếu có phần tử trùng, không thực hiện thao tác
            return;
        }

        // Cập nhật danh sách các phần tử đã thả
        setDroppedItems((prevDroppedItems) => [
            ...prevDroppedItems,
            { ...dragging, x, y }
        ]);

        // Loại bỏ phần tử khỏi danh sách gốc
        setItems((prevItems) => prevItems.filter(item => item.id !== dragging.id));

        setDragging(null); // Đặt lại trạng thái khi không còn kéo nữa
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "45%" }}>
                <h2>Danh sách các phần tử có thể kéo</h2>
                <div className="d-flex mb-3" style={{ flexDirection: "column" }}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, item)}
                            style={{
                                width: item.size + "px",
                                height: item.size + "px",
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: "cover",
                                marginBottom: "15px",
                                cursor: "pointer",
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Canvas nơi thả phần tử */}
            <div style={{ width: "45%" }}>
                <h2>Canvas để thả các phần tử</h2>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={600}
                    style={{ border: "1px solid black" }}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                />
                {coordinates && (
                    <div style={{ marginTop: "10px" }}>
                        <p><strong>Toạ độ thả:</strong> X: {coordinates.x}, Y: {coordinates.y}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CanvasWithDragAndDrop;
