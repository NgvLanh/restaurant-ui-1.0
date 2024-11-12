import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const resetPassword = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'email/password-recovery/reset-password',
            data: request,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo món ăn' };
    }
};

export const passwordRecoveryVerifyCode = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'email/password-recovery/verify-code',
            data: request,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(`Lỗi tạo món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo món ăn' };
    }
}

