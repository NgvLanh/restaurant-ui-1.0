import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const orderOffLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const orderOnLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

//test
export const getAllOrders = async ( orderStatus = "",currentPage, pageSize) => {
    try {
      const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
      const path = `orders?branch=${branchId}&orderStatus=${orderStatus}&page=${currentPage}&size=${pageSize}`;
      console.log("API Path:", path);
      const response = await ApiRequest({
        path,
        headers: `Bearer `
      });
      return response;
    } catch (error) {
      console.error(`Lỗi lấy danh sách đơn hàng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
      return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách đơn hàng' };
    }
  };
  
  export const updateOrderStatusService = async (orderId) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `orders/${orderId}`,
            headers: 'Bearer ',
        });
        return response;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
        throw error; // Để xử lý ở `OrderListPage`
    }
};

export const cancelOrderStatusService = async (orderId) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `orders/${orderId}/cancel`,
            headers: 'Bearer ',
        });

        // Đảm bảo trả về đúng cấu trúc
        return response?.data || response;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
        throw error;
    }
};


//test