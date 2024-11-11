import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus, BiShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import BranchStatusModal from "../BranchPage/Modals/BranchStatusModal";


const OrderListPage = () => {

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
      <PageHeader title="Trạng thái hoá đơn" />

      <div className="bg-white shadow-lg p-4 rounded-4" style={{ maxWidth: '1200px', margin: 'auto' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          {/* Chọn khoảng thời gian "Từ ngày - Đến ngày" */}
          <div className="d-flex gap-3" style={{ maxWidth: '350px' }}>
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
          </div>

          {/* Select để lọc theo trạng thái hóa đơn */}
          <div className="action">
            <Form.Select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-3"
              style={{ maxWidth: '200px' }}
            >
              <option value="0">Tất cả</option>
              <option value="ordered">Đã đặt món</option>
              <option value="in_kitchen">Đang chế biến</option>
              <option value="ready_to_serve">Sẵn sàng phục vụ</option>
              <option value="served">Đã phục vụ</option>
              <option value="delivery">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
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
                <td colSpan={7} className="text-center">Không có dữ liệu</td>
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

export default OrderListPage