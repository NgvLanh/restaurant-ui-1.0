import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/CategoryService/CategoryService';
import { getAllDishes, getAllDishesByCategoryId } from '../../../services/DishService/DishService';
import AddToCartModal from '../AddToCartModal/AddToCartModal';

const Menus = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const [selectedDish, setSelectedDish] = useState(null);

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    const fetchData = async () => {
        setCategories(await getAllCategories());
        if (selectedCategory) {
            setDishes(await getAllDishesByCategoryId(selectedCategory));
        } else {
            setDishes(await getAllDishes());
        }

    };

    const handleAddToCart = (dish, quantity) => {
        if (userInfo) {
            console.log(userInfo);
            localStorage.removeItem('cart_temp');
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart_temp')) || [];
            const existingItem = cartItems.find((e) => e.id === dish.id);

            if (existingItem) {
                existingItem.quantity += Number(quantity);
            } else {
                cartItems.push({ ...dish, quantity: Number(quantity), status: false });
            }

            localStorage.setItem('cart_temp', JSON.stringify(cartItems));
        }
    };



    const handleOpenModal = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center">
                    <h1 className="display-5 mb-5">Thực Đơn Của Chúng Tôi</h1>
                </div>
                <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="col-12 text-center">
                        <ul className="list-inline mb-5" id="portfolio-flters">

                            {categories?.map((category) => (
                                <li key={category?.id}
                                    className={`mx-2 ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category?.id)}
                                >{category?.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row g-4 portfolio-container">
                    {dishes?.map((dish) => (
                        <div key={dish?.id} className="col-lg-4 col-md-6 portfolio-item wow fadeInUp" data-wow-delay="0.1s">
                            <div className="rounded overflow-hidden">
                                <div className="position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src={dish?.image} alt="" />
                                    <div className="portfolio-overlay">
                                        <a className="btn btn-square btn-outline-light mx-1" href={dish?.image} data-lightbox="portfolio"><i className="fa fa-eye"></i></a>
                                        <a className="btn btn-square btn-outline-light mx-1"
                                            onClick={() => handleOpenModal(dish)}><i className="fa fa-shopping-cart"></i></a>
                                    </div>
                                </div>
                                <div className="border border-5 border-light border-top-0 p-4">
                                    <p className="text-primary fw-medium mb-2">{dish?.category?.name}</p>
                                    <h5 className="lh-base mb-0">{dish?.name}</h5>
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
                    onClose={handleCloseModal}
                    dish={selectedDish}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default Menus;
