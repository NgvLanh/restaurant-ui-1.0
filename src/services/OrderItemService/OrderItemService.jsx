import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const createOrderItem = async (data) =>
    await ApiRequest({
        method: 'post',
        path: 'order-items',
        data: data,
        headers: 'Bearer '
    });

export const updateQuantityOrderItem = async (orderItemId, quantity) =>
    await ApiRequest({
        method: 'patch',
        path: `order-items/${orderItemId}/${quantity}`,
        headers: 'Bearer '
    });

export const deleteOrderItem = async (orderItemId) =>
    await ApiRequest({
        method: 'delete',
        path: `order-items/${orderItemId}`,
        headers: 'Bearer '
    });
