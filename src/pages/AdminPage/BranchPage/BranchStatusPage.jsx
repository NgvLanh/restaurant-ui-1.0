import { BiChevronDown, BiClipboard, BiDownload, BiEdit, BiPencil, BiPlus, BiSearch, BiTrash, BiUpload } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { createBranchStatus, deleteBranchStatus, getAllBranchStatusPageable, updateBranchStatus } from "../../../services/BranchStatusService/BranchStatusService";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import BranchStatusModal from "./Modals/BranchStatusModal";
import { Button, Form, Table } from "react-bootstrap";
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
    if (initialValues) {
      try {
        const response = await updateBranchStatus(initialValues?.id, data);
        if (response?.status) {
          AlertUtils.success('Cập nhật trạng thái thành công!');
          setShowModal(false);
        }
      } catch (error) {
        AlertUtils.info(error.response?.data?.message);
      }
    } else {
      try {
        const response = await createBranchStatus(data);
        if (response?.status) {
          AlertUtils.success('Thêm trạng thái thành công!');
          setShowModal(false);
        }
      } catch (error) {
        AlertUtils.info(error.response?.data?.message);
      }

    }
    fetchBranchStatuses();
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    if (result) {
      try {
        const response = await deleteBranchStatus(id);
        if (response?.status) {
          AlertUtils.success('Xoá thành công!');
        }
      } catch (error) {
        AlertUtils.info('Xoá thất bại do ràng buộc dữ liệu');
      }
    }
    fetchBranchStatuses();
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Trạng thái chi nhánh" />

      <div className="bg-white shadow-lg p-4 rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            className="rounded-3"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{
              maxWidth: '350px',
            }}
          />
          <div className="action">
            <Button
              className="d-flex align-items-center rounded-3 px-4"
              onClick={() => {
                setInitialValues(null);
                setShowModal(true);
              }}
            >
              <BiPlus className="me-2 rounded-3" />
              Thêm
            </Button>
          </div>
        </div>

        <Table hover responsive className="rounded-4">
          <thead >
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
                      >
                        <BiEdit size={16} />
                      </span>
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
