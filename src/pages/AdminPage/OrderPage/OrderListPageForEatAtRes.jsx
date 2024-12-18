import { useEffect, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Form, Table } from "react-bootstrap";
import { getAllOrders, updateOrderStatusService } from "../../../services/OrderService/OrderService";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { formatCurrency, formatDateTime } from "../../../utils/FormatUtils";
import { OrderItemModal } from "./Modals/OrderItemModal";

const OrderStatus = new Map([
  ["READY_TO_SERVE", "Chưa thanh toán"],
  ["PAID", "Đã thanh toán"],
  ["CANCELLED", "Đã hủy"]
]);

const OrderListPageForEatAtRes = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(15);
  const [showOrderItemModal, setShowOrderItemModal] = useState(false);
  const [order, setOrder] = useState(null);



  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(selectedStatus, currentPage, pageSize);
      setTotalPages(response.data.totalPages || 1);
      setOrders(response.data.content?.filter(e => e.address == null));
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
      <PageHeader title="Hóa đơn ăn tại nhà hàng" />

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
              <th className="text-center">Tổng tiền</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((row, index) => {
                return (
                  <tr key={row.id} className="align-middle border-bottom">
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>{formatDateTime(row.time)}</td>
                    <td className="text-center">
                      <span
                        className="rounded-3 badge p-2"
                        style={{
                          padding: '5px 10px',
                          color: 'white',
                          background:
                            row.orderStatus === 'PAID'
                              ? '#216a3e'
                              : row.orderStatus === 'CANCELLED'
                                ? '#8b1a1a'
                                : '#b38f1d',
                        }}
                      >
                        {row.orderStatus === 'PAID'
                          ? 'Đã thanh toán'
                          : row.orderStatus === 'CANCELLED'
                            ? 'Đã huỷ'
                            : 'Chưa thanh toán'}
                      </span>
                    </td>
                    <td className="text-center">{row.fullName}</td>
                    <td className="text-center">{row.phoneNumber}</td>
                    <td className="text-center">{row.total > 0 && formatCurrency(row.total)}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setOrder(row);
                            setShowOrderItemModal(true);
                          }}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <OrderItemModal
        showModal={showOrderItemModal}
        setShowModal={() => setShowOrderItemModal(false)}
        orderData={order}
        handleConfirm={null}
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

export default OrderListPageForEatAtRes;
