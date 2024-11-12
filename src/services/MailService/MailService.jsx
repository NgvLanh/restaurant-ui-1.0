import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const sendRecoveryCode = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'email/send-otp',
            data: request,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo mã: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo mã' };
    }
};

