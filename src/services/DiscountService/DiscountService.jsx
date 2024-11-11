import ApiRequest from "../../configs/ApiRequest/ApiRequest";

const getAllDiscounts = async () => {
  try {
    const response = await ApiRequest({
      path: "discounts",
    });
    return response?.data?.content;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách giảm giá: ${
        error?.response?.data?.message || "Lỗi chưa cấu hình"
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
      `Lỗi tạo mã giảm giá: ${
        error?.response?.data?.message || "Lỗi chưa cấu hình"
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
      `Lỗi cập nhật mã giảm giá: ${
        error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi cập nhật chi nhánh",
    };
  }
};
const deleteDiscount = async (DiscountId) => {
  try {
    const response = await ApiRequest({
      method: "DELETE",
      path: `discounts/${DiscountId}`,
      headers: "Bearer ",
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi xóa mã giảm giá: ${
        error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi xóa chi nhánh",
    };
  }
};
const getAllDiscountsPage = async (currentPage, pageSize, code = "") => {
  try {
    const response = await ApiRequest({
      path: `discounts?page=${currentPage}&size=${pageSize}&code=${code}`, // Thêm code vào URL
      headers:`Bearer `
    });
    return response;
  } catch (error) {
    console.error(
      `Lỗi lấy danh sách giảm giá: ${
        error?.response?.data?.message || "Lỗi chưa cấu hình"
      }`
    );
    return {
      status: false,
      message: error?.response?.data?.message || "Lỗi lấy danh sách giảm giá",
    };
  }
};

export {
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscountsPage,
};
