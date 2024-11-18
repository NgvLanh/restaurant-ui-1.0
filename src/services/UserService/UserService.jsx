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

export const getEmployee = async (currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `users/employee?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách bàn' };
    }
};

export const createEmployee = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'users/employee',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi đăng ký thông tin người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đăng ký thông tin người dùng' };
    }
};


export const deleteEmployee = async (employeeId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `users/${employeeId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa bàn' };
    }
};

export const updateEmployee = async (employeeId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `users/${employeeId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật bàn' };
    }
};


export const getNonAdmin = async () => {
    try {
        const response = await ApiRequest({
            method: 'GET',
            path: 'users',
            data: request,
        });
        return response;
    } catch (error) {
        console.error(`Lỗi đăng ký thông tin người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đăng ký thông tin người dùng' };
    }
};

