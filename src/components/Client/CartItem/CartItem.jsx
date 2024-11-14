import { useMemo } from "react";
import { debounce } from "../../../utils/Debounce";
import { formatCurrency } from "../../../utils/FormatUtils";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const handleQuantityChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const quantity = Math.max(1, Math.min(25, parseInt(value, 10) || 1));
        onUpdateQuantity(item.id, quantity);
    };

    const quantityChange = useMemo(() => debounce(handleQuantityChange, 500), [])

    const handleToggleSelect = (id, status) => {
        onToggleSelect(id, status);
    };

    return (
        <tr>
            <td className="text-center align-content-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={item.status}
                    onChange={() => handleToggleSelect(item?.id, item?.status)}
                />
            </td>
            <td className="text-center align-content-center ">
                <img src={item.dish?.image} alt={item.dish?.name}
                    className="img-fluid rounded-3" style={{ width: '100%', maxHeight: '100px' }} />
            </td>
            <td className=" align-content-center">
                <h5>{item.dish?.name} / <small>{item.dish?.category?.name}</small></h5>
                <p className="text-muted">{item.dish?.description}</p>
                <p className="fw-bold">{formatCurrency(item.dish?.price)}</p>
            </td>
            <td className="text-center align-content-center">
                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-sm" onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <input
                        type="text"
                        value={item.quantity}
                        onChange={quantityChange}
                        style={{
                            maxWidth: '30px',
                            border: 'none',
                            textAlign: 'center',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                    />
                    <button className="btn btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
            </td>
            <td className="text-center align-content-center">
                <button className="btn btn-sm" onClick={() => onRemove(item.id)}>
                    <i className="fas fa-ban text-danger"></i>
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
