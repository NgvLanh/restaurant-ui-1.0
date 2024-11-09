const MenuItem = ({ item, onAdd }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow-sm">
            <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="fw-bold">${item.price.toFixed(2)}</p>
                <span className={`badge ${item.available ? 'bg-success' : 'bg-danger'}`}>
                    {item.available ? 'Có sẵn' : 'Hết hàng'}
                </span>
                <button
                    className="btn btn-primary mt-auto"
                    onClick={() => onAdd(item)}
                    disabled={!item.available}
                >   
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    </div>
);

export default MenuItem;