import { BiChevronDown, BiClipboard, BiDownload, BiEdit, BiPencil, BiPlus, BiSearch, BiTrash, BiUpload } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable"
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
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

  const openEditModal = (data) => {
    setInitialValues(data)
    setShowModal(true);
  };

  const openCreateModal = () => {
    setInitialValues(null)
    setShowModal(true);
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
              <th>Tên trạng thái</th>
              <th className="text-center">Màu</th>
              <th className="text-center">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {branchStatuses?.length > 0 ? (
              branchStatuses?.map((row, index) => (
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
  )
}

export default BranchStatusPage