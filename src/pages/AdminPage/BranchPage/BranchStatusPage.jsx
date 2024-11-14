import { BiChevronDown, BiClipboard, BiDownload, BiEdit, BiPencil, BiPlus, BiSearch, BiTrash, BiUpload } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { createBranchStatus, deleteBranchStatus, getAllBranchStatusPageable, updateBranchStatus } from "../../../services/BranchStatusService/BranchStatusService";
import ReusableModal from "../../../components/Admin/ReusableModal/ReusableModal";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import BranchStatusModal from "./Modals/BranchStatusModal";
import { Button, Dropdown, Form, Table } from "react-bootstrap";
import { FcDeleteColumn } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

const BranchStatusPage = () => {

  const [branchStatuses, setBranchStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

  useEffect(() => {
    fetchBranchStatuses();
  }, [currentPage, searchKey]);

  const fetchBranchStatuses = async () => {
    const response = await getAllBranchStatusPageable(searchKey, currentPage, pageSize);
    setTotalPages(response?.data?.totalPages);
    setBranchStatuses(response?.data?.content);
  }

  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(0);
  }

  const handleModalSubmit = async (data) => {
    const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
    if (initialValues) {
      const response = await updateBranchStatus(initialValues?.id, data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    } else {
      const response = await createBranchStatus(data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    }
    fetchBranchStatuses();
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    if (result) {
      const response = await deleteBranchStatus(id);
      if (response?.status) {
        AlertUtils.success('Xoá thành công!');
      } else {
        AlertUtils.error('Xoá thất bại!');
      }
    }
    fetchBranchStatuses();
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Trạng thái chi nhánh" />

      <div className="bg-white shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{
              maxWidth: '350px',
              padding: '10px 16px',
              borderRadius: '20px',
              border: '1px solid #e0e0e0',
              fontSize: '14px',
            }}
          />
          <div className="action">
            <Button
              className="d-flex align-items-center rounded-pill px-4"
              onClick={() => {
                setInitialValues(null);
                setShowModal(true);
              }}
              style={{
                fontSize: '14px',
                padding: '10px 20px',
                backgroundColor: '#AB7742',
                borderColor: '#3A8DFF',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(58, 141, 255, 0.3)',
              }}
            >
              <BiPlus className="me-2" />
              Thêm trạng thái
            </Button>
          </div>
        </div>

        <Table borderless hover responsive className="rounded-4">
          <thead style={{ backgroundColor: '#f5f5f5' }}>
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
                <tr key={row.id} className="align-middle" style={{ backgroundColor: '#ffffff' }}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.name}</td>
                  <td className="text-center">
                    <div
                      style={{
                        backgroundColor: row.colorCode,
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        margin: '0 auto',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    ></div>
                  </td>
                  <td className="text-center">
                    <span className="d-flex justify-content-center align-items-center gap-3">
                      <span
                        onClick={() => {
                          setInitialValues(row);
                          setShowModal(true);
                        }}
                        style={{
                          padding: '8px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <BiEdit size={16} />
                      </span>
                      <span
                        onClick={() => { handleDelete(row.id) }}
                        style={{
                          padding: '8px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <MdDelete size={16} />
                      </span>
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

      <BranchStatusModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleData={handleModalSubmit}
        initialValues={initialValues}
      />

      <RenderPagination
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );


}

export default BranchStatusPage;
