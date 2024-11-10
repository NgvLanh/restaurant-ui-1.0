import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả món ăn
const getAllDishes = async () => {
    try {
        const response = await ApiRequest({
            path: 'dishes'
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách món ăn' };
    }
};

// Tạo mới một món ăn
const createDish = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'dishes',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo món ăn' };
    }
};

// Cập nhật một món ăn theo ID
const updateDish = async (dishId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `dishes/${dishId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật món ăn' };
    }
};

// Xóa một món ăn theo ID
const deleteDish = async (dishId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `dishes/${dishId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa món ăn' };
    }
};

// Lấy danh sách món ăn theo danh mục
const getAllDishesByCategoryId = async (categoryId) => {
    try {
        const response = await ApiRequest({
            path: `dishes/${categoryId}`
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách món ăn' };
    }
};

const getAllDishesPageable = async (searchKey = '', currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `dishes?name=${searchKey}&page=${currentPage}&size=${pageSize}`
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách món ăn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách món ăn' };
    }
};

export { getAllDishes, createDish, updateDish, deleteDish, getAllDishesByCategoryId, getAllDishesPageable };
