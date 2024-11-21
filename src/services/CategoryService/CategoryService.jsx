import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả danh mục
const getAllCategories = async () => {
    try {
        const response = await ApiRequest({
            path: 'categories'
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách danh mục: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách danh mục' };
    }
};

// Tạo mới một danh mục
const createCategory = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'categories',
        data: request,
        headers: 'Bearer '
    });

// Cập nhật một danh mục theo ID
const updateCategory = async (categoryId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `categories/${categoryId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật danh mục: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật danh mục' };
    }
};

// Xóa một danh mục theo ID
const deleteCategory = async (categoryId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `categories/${categoryId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa danh mục: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa danh mục' };
    }
};

// Lấy danh sách tất cả danh mục
const getAllCategoriesPageable = async (searchKey = '', currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `categories?name=${searchKey}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách danh mục: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách danh mục' };
    }
};

export { getAllCategories, createCategory, updateCategory, deleteCategory, getAllCategoriesPageable };
