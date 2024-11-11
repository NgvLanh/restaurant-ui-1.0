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
            <PageHeader title="Danh sách chi nhánh" />
    
            <div className="bg-white shadow p-4 rounded-4" style={{ maxWidth: '1200px', margin: 'auto' }}>
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
                            Thêm
                        </Button>
                    </div>
                </div>
    
                <Table borderless hover responsive className="rounded-4">
                    <thead style={{ backgroundColor: '#f5f5f5' }}>
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
                            branches.map((row, index) => (
                                <tr key={row.id} className="align-middle" style={{ backgroundColor: '#ffffff' }}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td className="text-center">{row.districtName}</td>
                                    <td className="text-center">{row.provinceName}</td>
                                    <td className="text-center">{row.branchStatus?.name}</td>
                                    <td className="text-center">
                                        <span className="d-flex justify-content-center align-items-center gap-3">
                                            <span
                                                onClick={() => {
                                                    setInitialValues(row);
                                                    setShowModal(true);
                                                }}
                                                style={{
                                                    padding: '8px',
                                                    backgroundColor: '#F1F3F4',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                            >
                                                <BiEdit size={16} />
                                            </span>
                                            <span
                                                onClick={() => { handleDelete(row.id) }}
                                                style={{
                                                    padding: '8px',
                                                    backgroundColor: '#F1F3F4',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                            >
                                                <MdDelete size={16} />
                                            </span>
                                            {userInfo?.roles[0] && (
                                                <span
                                                    onClick={() => { handleDelete(row.id) }}
                                                    style={{
                                                        padding: '8px',
                                                        backgroundColor: '#F1F3F4',
                                                        borderRadius: '12px',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.3s ease',
                                                    }}
                                                >
                                                    <BiUser size={16} />
                                                </span>
                                            )}
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
    );
    
    
}

export default BranchListPage