import { BiClipboard, BiPencil, BiTrash } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable"
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { createBranchStatus, deleteBranchStatus, getAllBranchStatusPageable, updateBranchStatus } from "../../../services/BranchStatusService/BranchStatusService";
import ReusableModal from "../../../components/Admin/ReusableModal/ReusableModal";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";

const columnMapping = {
  id: 'Mã',
  name: 'Tên Trạng Thái',
  colorCode: 'Mã Màu'
};

const formInputs = [
  {
    name: 'name',
    label: 'Tên trạng thái',
    type: 'text',
    placeholder: 'Tên trạng thái',
    validation: {
      required: 'Tên trạng thái không được để trống',
      minLength: { value: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }
    }
  },
  {
    name: 'colorCode',
    label: 'Màu (Không bắt buộc)',
    type: 'color',
    placeholder: 'Nhập email',
    // validation: {
    //   required: 'Email là bắt buộc',
    //   pattern: {
    //     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     message: 'Email không hợp lệ'
    //   }
    // }
  }
];

const columns = [
  {
    label: 'Mã trạng thái',
    key: 'id',
    searchable: false,
    sortable: true,
  },
  {
    label: 'Tên trạng thái',
    key: 'name',
    searchable: true,
    sortable: true,
  },
  {
    label: 'Mã màu',
    key: 'colorCode',
    searchable: true,
    sortable: true,
  }
];


const BranchStatusPage = () => {

  const [branchStatuses, setBranchStatuses] = useState([]);
  const [current, setCurrent] = useState(null);
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
    setCurrent(0);
  }

  const handleModalSubmit = async (data) => {
    const successMessage = current ? 'Cập nhật thành công' : 'Thêm mới thành công';
    if (current) {
      const response = await updateBranchStatus(current?.id, data);
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
    setCurrent(data);
    setInitialValues(data);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setCurrent(null);
    setInitialValues(null);
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


  const actions = [
    // { label: '', icon: <BiClipboard size={16} />, onClick: (item) => console.log('Copy:', item) },
    { label: '', icon: <BiPencil size={16} />, onClick: (item) => { openEditModal(item) } },
    { label: '', icon: <BiTrash size={16} />, onClick: (item) => { handleDelete(item.id) } }
  ];

  return (
    <>
      <PageHeader title="Trạng thái chi nhánh" />

      <DataTable columns={columns}
        data={branchStatuses}
        onSort={null}
        onSearch={debouncedSearch}
        actions={actions}
        onAdd={openCreateModal}
      />

      <ReusableModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={current ? 'Cập nhật thông tin' : 'Thêm mới thông tin'}
        onSubmit={handleModalSubmit}
        inputs={formInputs}
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