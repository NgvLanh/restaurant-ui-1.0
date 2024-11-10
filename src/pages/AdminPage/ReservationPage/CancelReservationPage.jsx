import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { createreservation, deletereservation, getAllreservationsPageable, updatereservation } from "../../../services/ReservationService/ReservationService";

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
    const response = await getAllreservationsPageable(searchKey, currentPage, pageSize);
    setTotalPages(response?.data?.totalPages);
    setReservations(response?.data?.content);
  }

  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(0);
  }

  const handleModalSubmit = async (data) => {
    const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
    if (initialValues) {
      const response = await updatereservation(initialValues?.id, data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    } else {
      const response = await createreservation(data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    }
    fetchReservations();
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    if (result) {
      const response = await deletereservation(id);
      if (response?.status) {
        AlertUtils.success('Xoá thành công!');
      } else {
        AlertUtils.error('Xoá thất bại!');
      }
    }
    fetchReservations();
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Bàn đã huỷ" />

      <div className="bg-white shadow rounded-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{ maxWidth: '350px', borderRadius: '8px' }}
          />
          <div className="action">
            <Button
              className="d-flex align-items-center btn-primary rounded-3 px-4"
              onClick={() => {
                setInitialValues(null);
                setShowModal(true);
              }}
            >
              <BiPlus className="me-2" />
              Thêm
            </Button>
          </div>
        </div>

        <Table striped bordered hover responsive className="shadow-sm rounded">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Thời gian</th>
              <th className="text-center">Khách hàng</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Lý do</th>
            </tr>
          </thead>
          <tbody>
            {reservations?.length > 0 ? (
              reservations?.map((row, index) => (
                <tr key={row.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{row.name}</td>
                  <td className="text-center" style={{ backgroundColor: row.colorCode }}></td>
                  <td className="text-center">
                    <span className="d-flex justify-content-center align-items-center gap-3" style={{ cursor: 'pointer' }}>
                      <span onClick={() => {
                        setInitialValues(row);
                        setShowModal(true);
                      }}>
                        <BiEdit size={16} />
                      </span>
                      <span onClick={() => { handleDelete(row.id) }}>
                        <MdDelete size={16} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* <BranchStatusModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleData={handleModalSubmit}
        initialValues={initialValues}
      /> */}

      <RenderPagination
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default CancelReservationPage