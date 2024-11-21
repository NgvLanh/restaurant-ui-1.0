import { useEffect, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Form, Table } from "react-bootstrap";
import { cancelOrderStatusService, getAllOrders, updateOrderStatusService } from "../../../services/OrderService/OrderService";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { formatDateTime } from "../../../utils/FormatUtils";

// Map trạng thái
const OrderStatus = new Map([
  ["READY_TO_SERVE", "Sẵn sàng phục vụ (Ăn tại nhà hàng)"],
  ["SERVED", "Đã phục vụ (Ăn tại nhà hàng)"],
  ["PAID", "Đã thanh toán"]
]);

const OrderListPageForEatAtRes = () => {
  const [order, setOrder] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Trạng thái đang chọn
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

  // Hàm lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(selectedStatus, currentPage, pageSize);
      if (response?.data && response.data.content) {
        setTotalPages(response.data.totalPages || 1);
        setOrder(response.data.content); // Gán danh sách đơn hàng
      } else {
        setOrder([]); // Nếu không có dữ liệu, set rỗng
      }
    } catch (error) {
      AlertUtils.error("Không thể tải danh sách đơn hàng.");
    }
  };


  // Hàm xử lý khi nhấn vào trạng thái của đơn hàng
  const handleStatusClick = async (orderId, currentStatus) => {
    try {
      // Kiểm tra nếu trạng thái hiện tại là CANCELLED hoặc PAID
      if (currentStatus === 'PAID') {
        AlertUtils.error(`Không thể cập nhật trạng thái khi đơn hàng đã ở trạng thái ${OrderStatus.get(currentStatus)}.`);
        return;  // Dừng hàm nếu trạng thái không thể cập nhật
      }

      // Xác nhận hành động cập nhật trạng thái
      const confirm = await AlertUtils.confirm(
        `Bạn có chắc muốn chuyển trạng thái đơn hàng này từ ${OrderStatus.get(currentStatus)} sang trạng thái tiếp theo?`
      );

      if (confirm) {
        try {
          const response = await updateOrderStatusService(orderId);
          console.log("API Response:", response); // In để kiểm tra phản hồi từ API

          // Thay đổi điều kiện này để kiểm tra phản hồi chính xác
          if (response?.status === true) {
            AlertUtils.success("Cập nhật trạng thái thành công!");
            await fetchOrders(); // Lấy lại danh sách đơn hàng (chờ hoàn thành)
          } else {
            console.error("Response không hợp lệ:", response);
            AlertUtils.error("Cập nhật trạng thái thất bại!");
          }
        } catch (error) {
          console.error("Error: ", error); // Log lỗi để kiểm tra
          AlertUtils.error("Không thể cập nhật trạng thái đơn hàng.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
      AlertUtils.error("Có lỗi xảy ra khi xác nhận hành động.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]); // fetch lại khi page hoặc status thay đổi
  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Cập nhật selectedStatus
    setCurrentPage(0);         // Reset về trang đầu tiên
  };

  return (
    <>
      <PageHeader title="Trạng thái hóa đơn ăn tại nhà hàng" />

      <div className="bg-white shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          {/* Chọn khoảng thời gian "Từ ngày - Đến ngày" */}
          {/* <div className="d-flex gap-3" style={{ maxWidth: '350px' }}></div> */}
          {/* Select để lọc theo trạng thái hóa đơn */}
          <div className="action">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)} // Cập nhật selectedStatus
              className="rounded-3"
              style={{ maxWidth: '200px' }}
            >
              <option value="">Tất cả</option> {/* Hiển thị tất cả nếu không chọn trạng thái */}
              {Array.from(OrderStatus.entries()).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Form.Select>
          </div>
        </div>

        <Table hover responsive className="rounded-4 shadow-sm">
          <thead className="table-light border-bottom">
            <tr>
              <th className="text-center">STT</th>
              <th>Thời gian</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Khách hàng</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {order?.length > 0 ? (
              order
                .filter((row) =>
                  ["READY_TO_SERVE", "SERVED", "PAID"].includes(row.orderStatus)
                )
                .map((row, index) => {
                if (row.address) return null; 
                return(
                  <tr key={row.id} className="align-middle border-bottom">
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>
                    {formatDateTime(row.time)}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${row.orderStatus === 'CANCELLED'
                            ? 'bg-danger rounded-3 p-2'
                            : row.orderStatus === 'PAID'
                              ? 'bg-success rounded-3 p-2'
                              : row.orderStatus === 'PENDING'
                                ? 'bg-warning text-dark rounded-3 p-2'
                                : 'bg-primary rounded-3 p-2'
                          }`}
                        style={{
                          fontSize: '14px',
                          padding: '10px 16px',
                        }}
                      >
                        {OrderStatus.get(row.orderStatus)}
                      </span>
                    </td>
                    <td className="text-center">{row.user?.fullName}</td>
                    <td className="text-center">{row.user?.phoneNumber}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          style={{
                            width: '120px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            padding: '6px 12px',
                          }}
                          onClick={() => handleStatusClick(row.id, row.orderStatus)}
                        >
                          Chuyển trạng thái
                        </button>
                      </div>
                    </td>
                  </tr>
                )
                })
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-muted py-3">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <RenderPagination
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default OrderListPageForEatAtRes;
