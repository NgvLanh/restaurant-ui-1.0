import { useParams } from "react-router-dom";
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
    return await ApiRequest({
        path: "invoices/reservations-weekly",
        data: request,
        headers: 'Bearer '
    })
}

const getMonthlyOrderStatistics = async () => {
    return await ApiRequest({
        path: "invoices/monthly-orders",
        headers: 'Bearer '
    })
}
export { getDiscountCount, getBranchesCount, getInvoinceCount, getCountUser, getReversionByWeek, getMonthlyOrderStatistics };