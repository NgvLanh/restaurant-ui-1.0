import { useEffect, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Form, Table } from "react-bootstrap";
import { cancelOrderStatusService, getAllOrders, updateOrderStatusService } from "../../../services/OrderService/OrderService";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { formatDateTime } from "../../../utils/FormatUtils";
import { OrderItemModal } from "./Modals/OrderItemModal";

// Map trạng thái
const OrderStatus = new Map([
  ["PENDING", "Chờ xác nhận"],
  ["CONFIRMED", "Đã xác nhận"],
  ["SHIPPED", "Đang giao"],
  ["DELIVERED", "Đã giao"],
  ["CANCELLED", "Đã hủy"],
  ["PAID", "Đã thanh toán"],
]);

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(50);
  const [showOrderItemModal, setShowOrderItemModal] = useState(false);
  const [order, setOrder] = useState(null);

  // Hàm lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(selectedStatus, currentPage, pageSize);
      setTotalPages(response.data.totalPages || 1);
      setOrders(response.data.content?.filter(e => e.address != null));
    } catch (error) {
      AlertUtils.error("Không thể tải danh sách đơn hàng.");
    }
  };

  // Hàm xử lý khi nhấn vào trạng thái của đơn hàng
  const handleStatusClick = async (orderId, currentStatus) => {
    AlertUtils.warning(orderId);

    try {
      // Kiểm tra nếu trạng thái hiện tại là CANCELLED hoặc PAID
      if (currentStatus === 'CANCELLED' || currentStatus === 'PAID') {
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
            setShowOrderItemModal(false);
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

  // Thêm hàm xử lý hủy đơn hàng
  const handleCancelOrder = async (orderId) => {
    try {
      const confirm = await AlertUtils.confirm("Bạn có chắc muốn hủy đơn hàng này?");
      if (confirm) {
        const response = await cancelOrderStatusService(orderId);

        console.log("Phản hồi từ API:", response); // Để kiểm tra đầy đủ đối tượng response
        console.log("Order status trong response:", response?.orderStatus); // Kiểm tra giá trị orderStatus cụ thể

        // Kiểm tra nếu orderStatus là 'CANCELLED'
        if (response?.orderStatus === 'CANCELLED') {
          AlertUtils.success("Đơn hàng đã được hủy thành công!");
          await fetchOrders(); // Làm mới danh sách
        } else {
          AlertUtils.error("Không thể hủy đơn hàng. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      AlertUtils.error("Có lỗi xảy ra khi hủy đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  return (
    <>
      <PageHeader title="Trạng thái hóa đơn giao hàng" />

      <div className="bg-white shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">

          <div className="action">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-3"
              style={{ maxWidth: '200px' }}
            >
              <option value="">Tất cả</option>
              {Array.from(OrderStatus.entries()).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Form.Select>
          </div>
        </div>

        <Table hover responsive className="rounded-4 shadow-sm">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>Thời gian</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Khách hàng</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Địa chỉ</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {(orders && orders.length > 0) ? (
              orders.map((row, index) => {
                return (
                  <tr key={row.id} className="align-middle border-bottom">
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>
                      {formatDateTime(row.time)}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${row.orderStatus === 'CANCELLED'
                          ? 'bg-danger'
                          : row.orderStatus === 'PAID'
                            ? 'bg-success'
                            : row.orderStatus === 'PENDING'
                              ? 'bg-warning text-dark'
                              : 'bg-primary'
                          } rounded-3 p-2`}
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
                    <td className="text-center">{row.address?.address}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {row.orderStatus !== 'CANCELLED' && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setOrder(row);
                              setShowOrderItemModal(true);
                            }}
                          >
                            Chi tiết
                          </button>
                        )}
                        {row.orderStatus === 'PENDING' && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancelOrder(row.id)}
                          >
                            Hủy đơn
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">Không có đơn hàng nào</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <OrderItemModal
        showModal={showOrderItemModal}
        setShowModal={() => setShowOrderItemModal(false)}
        orderData={order}
        handleConfirm={handleStatusClick}
      />

      <RenderPagination
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default OrderListPage;
