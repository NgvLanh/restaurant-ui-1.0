import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getAddressByUserId = async (userId) => {
    try {
        const response = await ApiRequest({
            path: `addresses/user/${userId}`,
            headers: 'Bearer '
        });
        return response.data;
    } catch (error) {
        console.error(`Lỗi lấy địa chỉ người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy địa chỉ người dùng' };
    }
}


export const createAddress = async (data) =>
    await ApiRequest({
        method: 'POST',
        path: `addresses`,
        data: data,
        headers: 'Bearer '
    });


export const updateAddress = async (id, request) =>
    await ApiRequest({
        method: 'PATCH',
        path: `addresses/${id}`,
        data: request,
        headers: 'Bearer '
    });


export const deleteAddress = async (id) =>
    await ApiRequest({
        method: 'DELETE',
        path: `addresses/${id}`,
        headers: 'Bearer '
    });




