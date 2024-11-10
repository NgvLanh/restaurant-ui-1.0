import { BiClipboard, BiEdit, BiPencil, BiPlus, BiTrash, BiUser } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable"
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import ReusableModal from "../../../components/Admin/ReusableModal/ReusableModal";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { createBranch, deleteBranch, getAllBranchesPageable, updateBranch } from "../../../services/BranchService/BranchService";
import { MdDelete } from "react-icons/md";
import { Button, Form, Table } from "react-bootstrap";
import BranchModal from "./Modals/BranchModal";



const BranchListPage = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const [branches, setBranches] = useState([]);
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
        setCurrentPage(0);
    }

    const handleModalSubmit = async (data) => {
        const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (initialValues) {
            const response = await updateBranch(initialValues?.id, data);
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
                            <th>Tên chi nhánh</th>
                            <th className="text-center">Quận/Huyện</th>
                            <th className="text-center">Thành phố</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Tuỳ chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches?.length > 0 ? (
                            branches?.map((row, index) => (
                                <tr key={row.id} className="align-middle">
                                    <td className="text-center">{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.districtName}</td>
                                    <td>{row.provinceName}</td>
                                    <td>{row.branchStatus?.name}</td>
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
                                            {
                                                userInfo?.roles[0] &&
                                                <span onClick={() => { handleDelete(row.id) }}>
                                                    <BiUser size={16} />
                                                </span>
                                            }
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

            <BranchModal
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

export default BranchListPage