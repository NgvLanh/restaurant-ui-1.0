import { formatCurrency } from "../../../utils/FormatUtils";
import { useState, useEffect } from "react";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }) => {
    const [isSelected, setIsSelected] = useState(item.status);

    useEffect(() => {
        setIsSelected(item.status);
    }, [item.status]);

    const handleQuantityChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const quantity = Math.max(1, Math.min(25, parseInt(value, 10) || 1));
        onUpdateQuantity(item.id, quantity);
    };

    const handleToggleSelect = () => {
        const newSelected = !isSelected;
        setIsSelected(newSelected);
        onToggleSelect(item.id, newSelected);
    };

    return (
        <div className="row mb-3 align-items-center border-bottom pb-3">
            <div className="col-1 d-flex justify-content-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isSelected}
                    onChange={handleToggleSelect}
                />
            </div>
            <div className="col-2">
                <img src={item.image} alt={item.name} className="img-fluid rounded" />
            </div>
            <div className="col-4">
                <h5>{item.name} / <small>{item.category.name}</small></h5>
                <p className="text-muted">{item.description}</p>
                <p className="fw-bold">{formatCurrency(item.price)}</p>
            </div>
            <div className="col-2">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="border d-flex align-items-center justify-content-center">
                        <button className="btn btn-sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                        <input
                            type="text"
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            style={{
                                maxWidth: '30px',
                                border: 'none',
                                textAlign: 'center',
                                outline: 'none',
                            }}
                        />
                        <button className="btn btn-sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className="col-2 text-end">
                <button className="btn btn-sm" onClick={() => onRemove(item.id)}>
                    <i className="fas fa-ban text-danger"></i>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
