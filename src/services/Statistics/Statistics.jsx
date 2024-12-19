import ApiRequest from "../../configs/ApiRequest/ApiRequest";

const getDiscountCount = async (request) => {
    try {
        const response = await ApiRequest({
            path: "discounts/countMonth",
            data: request,
            headers: 'Bearer '
        })
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi đỗ danh sách tổng mã giảm giá: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo đặt bàn' };
    }
}
const getBranchesCount = async (request) => {
    try {
        const response = await ApiRequest({
            path: "branches/statistics",
            data: request,
            headers: 'Bearer '
        })
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi đỗ danh sách chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo đặt bàn' };
    }
}

const getInvoinceCount = async (request) => {
    try {
        const response = await ApiRequest({
            path: "invoices/countInvoice",
            data: request,
            headers: 'Bearer '
        })
        return response?.data.content;
    } catch (error) {
        console.error(`Lỗi đỗ danh sách hóa đơn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo đặt bàn' };
    }
}
const getCountUser = async (request) => {
    try {
        const response = await ApiRequest({
            path: "users/countUser",
            data: request,
            headers: 'Bearer '
        })
        return response?.data.content;
    } catch (error) {
        console.error(`Lỗi đỗ danh sách người dùng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo đặt bàn' };
    }
}

const getReversionByWeek = async (request) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `invoices/reservations-weekly?branchId=${branchId}`,
        data: request,
        headers: 'Bearer '
    })
}

const getMonthlyOrderStatistics = async () => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `invoices/monthly-orders?branchId=${branchId}`,
        headers: 'Bearer '
    })
}

export const getDailyOrderStatistics = async () => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `invoices/daily-orders?branchId=${branchId}`,
        headers: 'Bearer '
    })
}
export { getBranchesCount, getCountUser, getDiscountCount, getInvoinceCount, getMonthlyOrderStatistics, getReversionByWeek };

