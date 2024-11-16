import ApiRequest from "../../configs/ApiRequest/ApiRequest";

const getAllDiscounts = async () => {
  try {
    const response = await ApiRequest({
      path: "discounts",
    });
    return response?.data?.content;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách giảm giá: ${error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi lấy danh sách chi nhánh",
    };
  }
};
const createDiscount = async (request) => {
  try {
    const response = await ApiRequest({
      method: "POST",
      path: "discounts",
      data: request,
      headers: "Bearer ",
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi tạo mã giảm giá: ${error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi tạo chi nhánh",
    };
  }
};
const updateDiscount = async (discountId, request) => {
  try {
    const response = await ApiRequest({
      method: "PATCH",
      path: `discounts/${discountId}`,
      data: request,
      headers: "Bearer ",
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi cập nhật mã giảm giá: ${error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi cập nhật chi nhánh",
    };
  }
};
const deleteDiscount = async (discountId) => {
  try {
    const response = await ApiRequest({
      method: "DELETE",
      path: `discounts/${discountId}`,
      headers: "Bearer ",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const getAllDiscountsPage = async (currentPage, pageSize, code = "") => {
  try {
    const response = await ApiRequest({
      path: `discounts?page=${currentPage}&size=${pageSize}&code=${code}`, // Thêm code vào URL
      headers: `Bearer `
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách giảm giá: ${error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi lấy danh sách giảm giá",
    };
  }
};
const getAllDiscountsByBranchId = async (currentPage, pageSize,) => {
  try {
    const response = await ApiRequest({
      path: `discounts?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&page=${currentPage}&size=${pageSize}`,
      headers: `Bearer `
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách giảm giá: ${error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi lấy danh sách giảm giá",
    };
  }
};

export const checkDiscount = async (code) => {
  try {
    const response = await ApiRequest({
      path: `discounts/${code}`,
      headers: `Bearer `
    });
    return response;
  } catch (error) {
    return error;
  }
}

export { getAllDiscounts, createDiscount, updateDiscount, deleteDiscount, getAllDiscountsPage, getAllDiscountsByBranchId };
