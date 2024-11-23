import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getCartItemsByUserId = async (userId) => {
    try {
        const res = await ApiRequest({
            path: `cart-items/cart/${userId}`,
            headers: 'Bearer '
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateCartItemQuantity = async (cartItemId, quantity) =>
    await ApiRequest({
        method: 'PATCH',
        path: `cart-items/${cartItemId}/${quantity}`,
        headers: 'Bearer '
    });


export const updateSelectAll = async (userId, check) => {
    try {
        const res = await ApiRequest({
            method: 'PATCH',
            path: `cart-items/cart/${userId}/${check}`,
            headers: 'Bearer '
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateToggleSelect = async (cartItemId) => {
    try {
        const res = await ApiRequest({
            method: 'PATCH',
            path: `cart-items/status/${cartItemId}`,
            headers: 'Bearer '
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCartItem = async (cartItemId) =>
    await ApiRequest({
        method: 'DELETE',
        path: `cart-items/${cartItemId}`,
        headers: 'Bearer '
    });



export const deleteCartItemByUserId = async (userId) =>
    await ApiRequest({
        method: 'delete',
        path: `cart-items/cart/${userId}`,
        headers: 'Bearer '
    });


export const addToCart = async (userId, dishId, quantity) =>
    await ApiRequest({
        method: 'POST',
        path: `cart-items/${userId}/${dishId}/${quantity}`,
        headers: 'Bearer '
    });
