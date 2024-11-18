import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus, BiShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import BranchStatusModal from "../BranchPage/Modals/BranchStatusModal";
import { getAllOrders } from "../../../services/OrderService/OrderService";

const OrderStatus = new Map([
  ["PENDING_CONFIRMATION", "Chờ xác nhận"],
  ["CONFIRMED", "Đã xác nhận"],
  ["ORDERED", "Đã đặt món"],
  ["IN_KITCHEN", "Đang chế biến"],
  ["READY_TO_SERVE", "Sẵn sàng phục vụ"],
  ["SERVED", "Đã phục vụ (ăn tại bàn)"],
  ["DELIVERY", "Đang giao (giao hàng)"],
  ["DELIVERED", "Đã giao (giao hàng)"],
  ["CANCELLED", "Đã hủy"],
  ["PAID", "Đã thanh toán"],
]);

const OrderListPage = () => {
  const [order, setOrder] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(''); // Trạng thái đang chọn
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders with status:", selectedStatus, "Current page:", currentPage, "Page size:", pageSize);
      const response = await getAllOrders(selectedStatus, currentPage, pageSize);
      console.log("API Response Data:", response?.data);
  
      if (response?.data && response.data.content) {
        setTotalPages(response.data.totalPages || 1);
        setOrder(response.data.content); // Gán danh sách đơn hàng
      } else {
        setOrder([]); // Nếu không có dữ liệu, set rỗng
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      AlertUtils.error("Không thể tải danh sách đơn hàng.");
    }
  };
  

  useEffect(() => {
    console.log("Selected Status in useEffect:", selectedStatus); // Đảm bảo giá trị thay đổi
    fetchOrders();
  }, [currentPage, selectedStatus]);  // fetch lại khi page hoặc status thay đổi
  

  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Cập nhật trạng thái
    setCurrentPage(0);         // Reset về trang đầu tiên
  };

  // const debouncedSelect = useMemo(() => debounce(handleStatusChange, 500), []);

  return (
    <>
      <PageHeader title="Trạng thái hóa đơn" />

      <div className="bg-white shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
           {/* Chọn khoảng thời gian "Từ ngày - Đến ngày" */}
           {/* <div className="d-flex gap-3" style={{ maxWidth: '350px' }}>
            <Form.Control
              type="month"
              placeholder="Từ ngày"
              onChange={(e) => handleFromDateChange(e.target.value)}
              style={{
                maxWidth: '350px',
                padding: '10px 16px',
                borderRadius: '20px',
                border: '1px solid #e0e0e0',
                fontSize: '14px',
              }}
            />
          </div> */}

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

        <Table borderless hover responsive className="rounded-4">
          <thead style={{ backgroundColor: '#f5f5f5' }}>
            <tr>
              <th className="text-center">STT</th>
              <th>Thời gian</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Khách hàng</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Số bàn</th>
              <th className="text-center">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            {order?.length > 0 ? (
              order.map((row, index) => (
                <tr key={row.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{row.time}</td>
                  <td className="text-center" style={{ backgroundColor: row.colorCode }}>
                    {OrderStatus.get(row.orderStatus)}
                  </td>
                  <td className="text-center">{row.user.fullName}</td>
                  <td>{row.user.phoneNumber}</td>
                  <td>{row.table.number}</td>
                  <td>{row.address.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">Không có dữ liệu</td>
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

export default OrderListPage;
