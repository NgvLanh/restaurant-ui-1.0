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
        console.error(`Lỗi đặt lại mât khẩu: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đặt lại mật khẩu' };
    }
};

export const passwordRecoveryVerifyCode = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'email/password-recovery/verify-code',
            data: request,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xác thực otp: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xác thực otp' };
    }
}

export const updateUser = async (userId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `users/${userId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật người dùng' };
    }
}
