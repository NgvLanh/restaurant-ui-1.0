import React, { useEffect, useMemo, useState } from 'react';
import { getAllCategories } from '../../../services/CategoryService/CategoryService';
import { getAllDishes, getAllDishesByCategoryId, getAllDishesPageable } from '../../../services/DishService/DishService';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import { formatCurrency } from '../../../utils/FormatUtils';
import { getUserService } from '../../../services/AuthService/AuthService';
import { asyncCartService, getCartByUserId } from '../../../services/CartService/CartService';
import { addToCart, getCartItemsByUserId } from '../../../services/CartItemService/CartItemService';
import AlertUtils from '../../../utils/AlertUtils';
import { debounce } from '../../../utils/Debounce';

const Menus = () => {
    const cartTemps = JSON.parse(localStorage.getItem('cart_temps')) || [];
    const [userInfo, setUserInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [showModal, setShowModal] = useState(true);
    const [selectedDish, setSelectedDish] = useState(null);

    useEffect(() => {
        fetchUserInfo();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchDishByCategoryId(selectedCategory);
    }, [selectedCategory]);

    const fetchUserInfo = async () => {
        const response = await getUserService();
        setUserInfo(response || null);
    }

    const fetchCategories = async () => {
        const response = await getAllCategories();
        setCategories(response || []);
    }

    const fetchDishByCategoryId = async (categoryId) => {
        const response = await getAllDishesByCategoryId(categoryId);
        setDishes(response || []);
    }

    const handleAddToCart = async (dish, quantity) => {
        quantity = parseInt(quantity);

        if (!userInfo) {
            const existingItem = cartTemps.find(e => e.dish.id === dish.id);

            if (existingItem) {
                if (existingItem.quantity + quantity > 20) {
                    AlertUtils.info('Bạn chỉ có thể thêm tối đa là số lượng món này là 20');
                    return;
                }
                existingItem.quantity += quantity;
            } else {
                if (quantity > 20) {
                    AlertUtils.info('Bạn chỉ có thể thêm tối đa là số lượng món này là 20');
                    return;
                }
                const data = {
                    id: `${dish.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    dish: { ...dish },
                    quantity,
                    status: false
                };
                cartTemps.push(data);
            }

            localStorage.setItem('cart_temps', JSON.stringify(cartTemps));
        } else {
            try {
                await addToCart(userInfo.id, dish.id, quantity);
            } catch (error) {
                AlertUtils.info(error.response?.data?.message || 'Lỗi không xác định');
            }
        }
    };

    const handleSearchChange = async (value) => {
        const response = await getAllDishesPageable(value);
        setDishes(response.data?.content || []);
    }

    const debouncedSearch = useMemo(() => debounce(handleSearchChange, 500), []);

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center">
                    <h1 className="display-5 mb-5">Thực Đơn Của Chúng Tôi</h1>
                </div>
                <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="col-12">
                        <ul className="list-inline mb-5 d-flex justify-content-between"
                            id="portfolio-flters">
                            <div className='ms-2'>
                                <li className={`mx-2 ${selectedCategory === 0 ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(0)}
                                >
                                    Tất cả</li>
                                {categories?.length > 0 ? (categories?.map((category) => (
                                    <li key={category?.id}
                                        className={`mx-2 ${selectedCategory === category.id ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category?.id)}
                                    >{category?.name}</li>
                                ))) : (<li></li>)}
                            </div>
                            <div className='me-2'>
                                <input type="text"
                                    placeholder='Nhập món ăn cần tìm'
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                    className='form-control rounded-3' />
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="row g-4 portfolio-container d-flex flex-wrap">
                    {dishes?.map((dish) => (
                        <div
                            key={dish?.id}
                            className="portfolio-item wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{
                                flex: '1 1 calc(33.333% - 20px)',
                                maxWidth: 'calc(33.333% - 20px)',
                                margin: '10px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                className="rounded overflow-hidden d-flex flex-column"
                                style={{ height: '100%' }}
                            >
                                <div className="position-relative overflow-hidden">
                                    <img
                                        className="img-fluid w-100"
                                        src={dish?.image}
                                        alt={dish?.image}
                                        style={{
                                            minHeight: '200px',
                                            maxHeight: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <div className="portfolio-overlay">
                                        <a
                                            className="btn btn-square btn-outline-light mx-1"
                                            onClick={() => {
                                                setSelectedDish(dish);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="fa fa-shopping-cart"></i>
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className="border border-5 border-light border-top-0 p-4 flex-grow-1"
                                    style={{ overflow: 'hidden' }}
                                >
                                    <p className="text-primary fw-medium mb-2">{dish?.category?.name}</p>
                                    <p className="d-flex justify-content-start align-items-center gap-2">
                                        <h5 className="lh-base mb-0">{dish?.name}</h5>
                                        <span>{formatCurrency(dish?.price)}</span>
                                    </p>
                                    <p>{dish?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal Add to Cart */}
            {selectedDish && (
                <AddToCartModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    dish={selectedDish}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default Menus;
