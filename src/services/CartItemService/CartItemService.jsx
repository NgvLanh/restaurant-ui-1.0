import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getCartItemsByUserId = async (userId) => {
    try {
        const res = await ApiRequest({
            path: 'cart-items/cart/' + userId,
            headers: 'Bearer '
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}