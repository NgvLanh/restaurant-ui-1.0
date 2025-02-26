import ApiRequest from "../../configs/ApiRequest/ApiRequest";

//Tổng doanh thu
export const getTotalRevenue = async (request) => {
    return await ApiRequest({
        path: 'invoices/total-revenue',
        headers: 'Bearer ',
        data: request
    });
};

//Tổng món ăn
const getTotalDishes = async (request) => {
    try {
        const response = await ApiRequest({
            path: 'dishes/total-dishes',
            headers: 'Bearer ',
            data: request
        });
        return response || null; // Trả về giá trị số nếu có, hoặc null nếu không
    } catch (error) {
        console.error(`Lỗi lấy tổng món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};

export { getTotalDishes };


//Tổng số người đã đăng ký
const getTotalUsers = async (request) => {
    try {
        const response = await ApiRequest({
            path: 'users/total-users',
            headers: 'Bearer ',
            data: request
        });
        return response || null; // Trả về giá trị số nếu có, hoặc null nếu không
    } catch (error) {
        console.error(`Lỗi lấy tổng số người đăng ký: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};

export { getTotalUsers };


const getTotalOrders = async (request) => {
    try {
        const response = await ApiRequest({
            path: 'orders/total-order',
            headers: 'Bearer ',
            data: request
        });
        return response || null; // Trả về giá trị số nếu có, hoặc null nếu không
    } catch (error) {
        console.error(`Lỗi lấy tổng đơn hàng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};

export { getTotalOrders };
//Tổng doanh thu theo từng tháng
// const getMonthlyRevenue = async (request) => {
//     try {
//         const response = await ApiRequest({
//             path: 'invoices/monthly-revenue',
//             headers: 'Bearer ',
//             data: request
//         });
//         console.log("API Response:", response); // Kiểm tra giá trị trả về
//         return response || null; // Trả về dữ liệu nếu có, hoặc null nếu không
//     } catch (error) {
//         console.error(`Lỗi lấy doanh thu theo tháng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
//         return { status: false, message: error?.response?.data?.message || 'Lỗi lấy doanh thu theo tháng' };
//     }
// };

const getMonthlyRevenue = async (request) => {
    return await ApiRequest({
        path: 'invoices/monthly-revenue',
        data: request,
        headers: 'Bearer '
    })
}

export { getMonthlyRevenue };

const getTotalOrdersCanCelled = async (request) => {
    try {
        const response = await ApiRequest({
            path: 'orders/total-order-cancelled',
            headers: 'Bearer ',
            data: request
        });
        return response || null; // Trả về giá trị số nếu có, hoặc null nếu không
    } catch (error) {
        console.error(`Lỗi lấy tổng đơn hàng đã hủy: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};

export { getTotalOrdersCanCelled };