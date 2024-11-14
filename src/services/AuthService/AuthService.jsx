import ApiRequest from "../../configs/ApiRequest/ApiRequest";

const getUserService = async () => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'users/info',
            headers: 'Bearer '
        });
        return response?.data;
    } catch (error) {
        console.error(`Lỗi lấy thông tin người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return error?.response?.data?.message || 'Lỗi chưa cấu hình';
    }
};

const registerService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'users',
            data: request,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi đăng ký thông tin người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đăng ký thông tin người dùng' };
    }
};

const loginService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'auth/login',
            data: request
        });
        return response;
    } catch (error) {
        // console.error(`Lỗi đăng nhập: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        console.log(error);
        // return { status: false, message: error || 'Lỗi đăng nhập' };
    }
};

export { getUserService, registerService, loginService };
