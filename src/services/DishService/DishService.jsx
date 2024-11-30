import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getAllDishes = async () => {
    const response = await ApiRequest({
        path: 'dishes'
    });
    return response?.data?.content;
};

export const createDish = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'dishes',
        data: request,
        headers: 'Bearer '
    });
}

export const updateDish = async (dishId, request) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `dishes/${dishId}`,
        data: request,
        headers: 'Bearer '
    });
};

export const deleteDish = async (dishId) => {
    return await ApiRequest({
        method: 'DELETE',
        path: `dishes/${dishId}`,
        headers: 'Bearer '
    });
};

export const getAllDishesByCategoryId = async (categoryId) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    const response = await ApiRequest({
        path: `dishes/${branchId}/${categoryId}`
    });
    return response?.data?.content;
};

export const getAllDishesPageable = async (searchKey = '', currentPage, pageSize) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `dishes?branch=${branchId}&name=${searchKey}&page=${currentPage}&size=${pageSize}`
    });
};
