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


export const createAddress = async (data) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: `addresses`,
            data: data,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo địa chỉ người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo địa chỉ người dùng' };
    }
}

export const updateAddress = async (id, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `addresses/${id}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo địa chỉ người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo địa chỉ người dùng' };
    }
}

export const deleteAddress = async (id) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `addresses/${id}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo địa chỉ người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo địa chỉ người dùng' };
    }
}



