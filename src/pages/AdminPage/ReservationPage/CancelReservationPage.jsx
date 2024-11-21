import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { getAllCancelReservationsPageable } from "../../../services/ReservationService/ReservationService";
import { formatDateTime } from "../../../utils/FormatUtils";

const CancelReservationPage = () => {

  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);


  useEffect(() => {
    fetchReservations();
  }, [currentPage, searchKey]);

  const fetchReservations = async () => {
    try {
      const response = await getAllCancelReservationsPageable(searchKey, currentPage, pageSize);
      setTotalPages(response?.data?.totalPages);
      setReservations(response?.data?.content);
    } catch (error) {
      AlertUtils.error(`Lỗi lấy danh sách huỷ bàn`, error);
    }
  }

  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(0);
  }


  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    fetchReservations();
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Bàn đã huỷ" />

      <div className="bg-white shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{
              maxWidth: '350px',
            }}
          />
        </div>

        <Table hover responsive className="rounded-4">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Thời gian</th>
              <th className="text-center">Khách hàng</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Lý do</th>
              <th className="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {reservations?.length > 0 ? (
              reservations.map((row, index) => (
                <tr key={row.id} className="align-middle" >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{formatDateTime(`${row.bookingDate}T${row.startTime}`)}</td>
                  <td className="text-center">{row.fullName}</td>
                  <td className="text-center">{row.phoneNumber}</td>
                  <td className="text-center">{row.cancelReason}</td>
                  <td className="text-center">
                    <span className="d-flex justify-content-center align-items-center gap-3">
                      <span
                        onClick={() => { handleDelete(row.id) }}
                      >
                        <MdDelete size={16} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">Không có dữ liệu</td>
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




}

export default CancelReservationPage