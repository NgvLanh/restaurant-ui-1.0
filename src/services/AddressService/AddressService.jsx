import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getAddressByUserId = async (userId) => {
    try {
        const response = await ApiRequest({
            path: `addresses/user/${userId}`,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy địa chỉ người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy địa chỉ người dùng' };
    }
}