import ApiRequest from "../../configs/ApiRequest/ApiRequest";
import { formatDate } from "../../utils/FormatUtils";

export const getAllDiscounts = async () => {
  const response = await ApiRequest({
    path: "discounts",
  });
  return response?.data?.content;
};

export const createDiscount = async (request) => {
  const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
  return await ApiRequest({
    method: "POST",
    path: "discounts",
    data: {
      ...request,
      branchId: branchId
    },
    headers: "Bearer ",
  });
};

export const updateDiscount = async (discountId, request) => {
  return await ApiRequest({
    method: "PATCH",
    path: `discounts/${discountId}`,
    data: request,
    headers: "Bearer ",
  });
};

export const deleteDiscount = async (discountId) => {
  return await ApiRequest({
    method: "DELETE",
    path: `discounts/${discountId}`,
    headers: "Bearer ",
  });
};

export const getAllDiscountsPage = async (currentPage, pageSize, code = "") => {
  return await ApiRequest({
    path: `discounts?page=${currentPage}&size=${pageSize}&code=${code}`,
    headers: `Bearer `
  });
};

export const getAllDiscountsByBranchIdAndMonth = async (month, currentPage, pageSize) => {
  const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
  return await ApiRequest({
    path: `discounts?branchId=${branchId}&month=${formatDate(month)}&page=${currentPage}&size=${pageSize}`,
    headers: `Bearer `
  });
};

export const checkDiscount = async (code) => {
  return await ApiRequest({
    path: `discounts/${code}`,
    headers: `Bearer `
  });
};


