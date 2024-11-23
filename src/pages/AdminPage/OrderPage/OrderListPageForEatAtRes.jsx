import { useEffect, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Form, Table } from "react-bootstrap";
import { getAllOrders, updateOrderStatusService } from "../../../services/OrderService/OrderService";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { formatDateTime } from "../../../utils/FormatUtils";

const OrderStatus = new Map([
  ["READY_TO_SERVE", "Chưa thanh toán"],
  ["PAID", "Đã thanh toán"],
  ["CANCELLED", "Đã hủy"]
]);

const OrderListPageForEatAtRes = () => {
  const [order, setOrder] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);



  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(selectedStatus, currentPage, pageSize);
      setTotalPages(response.data.totalPages || 1);
      setOrder(response.data.content);
    } catch (error) {
      AlertUtils.error("Không thể tải danh sách đơn hàng.");
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(0);
  };

  return (
    <>
      <PageHeader title="Trạng thái hóa đơn ăn tại nhà hàng" />

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
            </tr>
          </thead>
          <tbody>
            {order?.length > 0 ? (
              order?.map((row, index) => {
                if (row.address) return null;
                return (
                  <tr key={row.id} className="align-middle border-bottom">
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>{formatDateTime(row.time)}</td>
                    <td className="text-center">
                      {row.orderStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </td>
                    <td className="text-center">{row.fullName}</td>
                    <td className="text-center">{row.phoneNumber}</td>
                    <td className="text-center">{row.address}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">
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
