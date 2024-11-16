
import { FaDeleteLeft } from "react-icons/fa6";
import { formatCurrency } from "../../../utils/FormatUtils";
const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }) => {


    const handleUpdateQuantity = async (id, quantity) => {
        const parsedValue = parseInt(quantity, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            await onUpdateQuantity(id, parsedValue);
        }
    }

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
                    className="img-fluid rounded-3" style={{ maxWidth: '250px', width: '100%', maxHeight: '100px' }} />
            </td>
            <td className=" align-content-center">
                <h5>{item.dish?.name} / <small>{item.dish?.category?.name}</small></h5>
                <p className="text-muted">{item.dish?.description}</p>
                <p className="fw-bold">{formatCurrency(item.dish?.price)}</p>
            </td>
            <td className="text-center align-content-center">
                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                        style={{
                            maxWidth: '30px',
                            border: 'none',
                            textAlign: 'center',
                            outline: 'none',
                            backgroundColor: 'transparent'
                        }}
                    />
                    <button className="btn btn-sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>

                </div>
            </td>
            <td className="text-center align-content-center">
                <button className="btn btn-sm" onClick={() => onRemove(item.id)}>
                    <FaDeleteLeft size={20} className="text-danger" />
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
