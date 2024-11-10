import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus, BiShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import BranchStatusModal from "../BranchPage/Modals/BranchStatusModal";
import { createBranchStatus, deleteBranchStatus, getAllBranchStatus, updateBranchStatus } from "../../../services/BranchStatusService/BranchStatusService";


const DiscountListPage = () => {

  const [branchStatuses, setBranchStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);


  useEffect(() => {
    // fetchBranchStatuses();
  }, [currentPage, searchKey]);

  const handleFromDateChange = async () => {

  }
  const handleToDateChange = async () => {

  }
  const handleStatusChange = async () => {

  }
  return (
    <>
      <PageHeader title="Trạng thái chi nhánh" />

      <div className="bg-white shadow rounded-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          {/* Chọn khoảng thời gian "Từ ngày - Đến ngày" */}
          <div className="d-flex gap-3" style={{ maxWidth: '350px' }}>
            <Form.Control
              type="date"
              placeholder="Từ ngày"
              onChange={(e) => handleFromDateChange(e.target.value)}
              style={{ borderRadius: '8px' }}
            />
            <Form.Control
              type="date"
              placeholder="Đến ngày"
              onChange={(e) => handleToDateChange(e.target.value)}
              style={{ borderRadius: '8px' }}
            />
          </div>

          {/* Select để lọc theo trạng thái hóa đơn */}
          <div className="action">
            <Form.Select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-3 px-4"
              style={{ maxWidth: '200px' }}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="paid">Đã thanh toán</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="cancelled">Đã hủy</option>
            </Form.Select>
          </div>
        </div>


        <Table striped bordered hover responsive className="shadow-sm rounded">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th>Tên trạng thái</th>
              <th className="text-center">Màu</th>
              <th className="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {branchStatuses?.length > 0 ? (
              branchStatuses.map((row, index) => (
                <tr key={row.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{row.name}</td>
                  <td className="text-center" style={{ backgroundColor: row.colorCode }}></td>
                  <td className="text-center">
                    <span
                      className="d-flex justify-content-center align-items-center gap-3"
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Thay thế edit bằng view */}
                      <span
                        onClick={() => {
                          setInitialValues(row);
                          setShowModal(true);
                        }}
                      >
                        <BiShow size={16} />
                      </span>
                      {/* <span onClick={() => handleDelete(row.id)}>
                        <MdDelete size={16} />
                      </span> */}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">Không có dữ liệu</td>
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

export default DiscountListPage