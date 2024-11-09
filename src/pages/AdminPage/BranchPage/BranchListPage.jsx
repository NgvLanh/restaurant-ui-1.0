import { BiClipboard, BiPencil, BiTrash } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable"
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import ReusableModal from "../../../components/Admin/ReusableModal/ReusableModal";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { createBranch, deleteBranch, getAllBranchesPageable, updateBranch } from "../../../services/BranchService/BranchService";

const columnMapping = {
    id: 'Mã',
    name: 'Tên Chi Nhánh',
    phoneNumber: 'Số Điện Thoại',
    address: 'Địa Chỉ',
    wardName: 'Phường/Xã',
    // wardId: 'Mã Phường/Xã',
    districtName: 'Quận/Huyện',
    // districtId: 'Mã Quận/Huyện',
    provinceName: 'Thành Phố',
    // provinceId: 'Mã Thành Phố',
    branchStatus: 'Trạng Thái Chi Nhánh',
};

const formInputs = [
    {
        name: 'name',
        label: 'Tên Chi Nhánh',
        type: 'text',
        placeholder: 'Nhập tên chi nhánh',
        colSize: 6, // Kích thước cột
        validation: {
            required: 'Tên chi nhánh không được để trống',
            maxLength: { value: 100, message: 'Tên chi nhánh không được vượt quá 100 ký tự' }
        }
    },
    {
        name: 'phoneNumber',
        label: 'Số Điện Thoại',
        type: 'text',
        placeholder: 'Nhập số điện thoại',
        colSize: 6,
        validation: {
            required: 'Số điện thoại không được để trống',
            pattern: { value: /^\d{10,11}$/, message: 'Số điện thoại phải có 10 hoặc 11 chữ số' }
        }
    },
    {
        name: 'provinceId',
        label: 'Mã Thành Phố',
        type: 'select',
        placeholder: 'Chọn mã thành phố',
        colSize: 6,
        validation: {
            required: 'Thành phố không được để trống',
        }
    },
    {
        name: 'districtId',
        label: 'Mã Quận/Huyện',
        type: 'select',
        placeholder: 'Chọn mã quận/huyện',
        colSize: 6,
        validation: {
            required: 'Quận/Huyện không được để trống',
        }
    },
    {
        name: 'wardId',
        label: 'Mã Phường/Xã',
        type: 'select',
        placeholder: 'Chọn mã phường/xã',
        colSize: 6,
        validation: {
            required: 'Phường/Xã không được để trống',
        }
    },
    {
        name: 'branchStatus',
        label: 'Trạng Thái Chi Nhánh',
        type: 'select',
        placeholder: 'Chọn trạng thái chi nhánh',
        colSize: 6,
        validation: {
            required: 'Trạng thái chi nhánh không được để trống',
        }
    },
    {
        name: 'address',
        label: 'Địa Chỉ',
        type: 'textarea',
        placeholder: 'Nhập địa chỉ',
        colSize: 12,
        validation: {
            maxLength: { value: 255, message: 'Địa chỉ không được vượt quá 255 ký tự' }
        }
    }
];

const columns = [
    {
        label: 'Mã chi nhánh',
        key: 'id',
        searchable: false,
        sortable: true,
    },
    {
        label: 'Tên chi nhánh',
        key: 'name',
        searchable: true,
        sortable: true,
    },
    {
        label: 'Số điện thoại',
        key: 'phoneNumber',
        searchable: true,
        sortable: true,
    },
    {
        label: 'Địa chỉ',
        key: 'address',
        searchable: true,
        sortable: false,
    },
    {
        label: 'Thành phố',
        key: 'provinceName',
        searchable: true,
        sortable: false,
    },
];

const BranchListPage = () => {

    const [branches, setBranches] = useState([]);
    const [current, setCurrent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);


    useEffect(() => {
        fetchBranches();
    }, [currentPage, searchKey]);

    const fetchBranches = async () => {
        const response = await getAllBranchesPageable(searchKey, currentPage, pageSize);
        setTotalPages(response?.data?.totalPages);
        setBranches(response?.data?.content);
    }

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrent(0);
    }

    const handleModalSubmit = async (data) => {
        const successMessage = current ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (current) {
            const response = await updateBranch(current?.id, data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        } else {
            const response = await createBranch(data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        }
        fetchBranches();
    };


    const openEditModal = (data) => {
        console.log(`Edit`);
        setCurrent(data);
        setInitialValues(data);
        setShowModal(true);
    };

    const openCreateModal = () => {
        console.log(`Created`);
        setCurrent(null);
        setInitialValues(null);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
        if (result) {
            const response = await deleteBranch(id);
            if (response?.status) {
                AlertUtils.success('Xoá thành công!');
            } else {
                AlertUtils.error('Xoá thất bại!');
            }
        }
        fetchBranches();
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

            <DataTable
                columns={columns}
                data={branches}
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

export default BranchListPage