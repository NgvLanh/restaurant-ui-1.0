import { formatCurrency } from "../../../utils/FormatUtils";

const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const handleQuantityChange = (e) => {
        if (userInfo) {
            console.log(userInfo);
        } else {
            const value = e.target.value.replace(/\D/g, '');
            const quantity = Math.max(1, Math.min(25, parseInt(value, 10) || 1));
            // onUpdateQuantity(item.id, quantity);
            console.log(item.id, quantity);

        }
    };

    const handleToggleSelect = () => {

    };

    return (
        <div className="row mb-3 align-items-center border-bottom pb-3">
            <div className="col-1 d-flex justify-content-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={item.status}
                />
            </div>
            <div className="col-2">
                <img src={item.dish?.image} alt={item.dish?.name} className="img-fluid rounded" />
            </div>
            <div className="col-4">
                <h5>{item.dish?.name} / <small>{item.dish?.category?.name}</small></h5>
                <p className="text-muted">{item.dish?.description}</p>
                <p className="fw-bold">{formatCurrency(item.dish?.price)}</p>
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
