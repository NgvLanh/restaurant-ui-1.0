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
        const response = await ApiRequest({
            method: 'PATCH',
            path: `users/${userId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
}

export const getEmployee = async (currentPage, pageSize, phoneNumber) => {
    try {
        const response = await ApiRequest({
            path: `users/employee?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&phoneNumber=${phoneNumber}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách bàn' };
    }
};

export const createEmployee = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'users/employee',
        data: request,
        headers: 'Bearer '
    });



export const deleteEmployee = async (employeeId) => {
    return await ApiRequest({
        method: 'DELETE',
        path: `users/${employeeId}`,
        headers: 'Bearer '
    });
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
        console.error(`Lỗi cập nhật: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật ' };
    }
};


export const getNonAdmin = async (request) => {
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

