import { BiCheck, BiClipboard, BiEdit, BiPencil, BiPlus, BiTrash, BiUser } from "react-icons/bi";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import ReusableModal from "../../../components/Admin/ReusableModal/ReusableModal";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { createBranch, deleteBranch, getAllBranchesPageable, updateBranch, createNonAdmin, updateBranch01 } from "../../../services/BranchService/BranchService";
import { MdDelete } from "react-icons/md";
import { Button, Form, Table } from "react-bootstrap";
import BranchModal from "./Modals/BranchModal";
import UserModal from "./Modals/UserModal";
import { updateEmployee } from "../../../services/UserService/UserService"
const BranchListPage = () => {
    const [branches, setBranches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        fetchBranches();
    }, [currentPage, searchKey]);

    const fetchBranches = async () => {
        const response = await getAllBranchesPageable(searchKey, currentPage, pageSize);
        setTotalPages(response?.data?.totalPages);
        setBranches(response?.data?.content);
    };

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrentPage(0);
    };

    const handleModalSubmit = async (data) => {
        const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (initialValues) {
            try {
                const response = await updateBranch(initialValues?.id, data);
                if (response?.status) {
                    AlertUtils.success(successMessage);
                    setShowModal(false);
                    fetchBranches();
                }
            } catch (error) {
                AlertUtils.error(error.response?.data?.message);
                return false;
            }
        } else {
            try {
                const response = await createBranch(data);
                if (response?.status) {
                    AlertUtils.success(successMessage);
                    setShowModal(false);
                    fetchBranches();
                }
            } catch (error) {
                AlertUtils.error(error.response?.data?.message);
                return false;
            }
        }
        return true;
    };

    const handleSetRole = async (data) => {
        const { confirmPassword, ...requestData } = data;
        if (initialValues?.id) {
            if (initialValues?.email) {
                try {
                    const updateResponse = await updateEmployee(initialValues.id, requestData);
                    if (updateResponse?.status) {
                        AlertUtils.success('Cập nhật thành công!');
                        setShowUserModal(false);
                    }
                } catch (error) {
                    AlertUtils.error(error.response?.data?.message);
                }
            }
            else {
                try {
                    const userResponse = await createNonAdmin(requestData);
                    const updatedBranchData = {
                        ...initialValues,
                        user: userResponse.data
                    };
                    try {
                        const branchResponse = await updateBranch01(initialValues.id, updatedBranchData);
                        if (branchResponse?.status) {
                            AlertUtils.success('Tạo người dùng và cập nhật chi nhánh thành công!');
                            setShowUserModal(false);
                        }
                    } catch (error) {
                        AlertUtils.error(error.response?.data?.message);
                    }
                } catch (error) {
                    AlertUtils.error(error.response?.data?.message.email
                        || error.response?.data?.message.phoneNumher
                        || error.response?.data?.message.password
                        || error.response?.data?.message
                    );
                }

            }
        } else {
            //
        }
        fetchBranches();
    };

    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
        if (result) {
            try {
                const response = await deleteBranch(id);
                if (response?.status) {
                    AlertUtils.success('Xoá thành công!');
                }
            } catch (error) {
                AlertUtils.error(error.response?.data?.message);
            }
        }
        fetchBranches();
    };

    const handleUserModalOpen = (branch) => {
        setInitialValues(branch);
        setShowUserModal(true);
    };

    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    return (
        <>
            <PageHeader title="Danh sách chi nhánh" />

            <div className="bg-white shadow p-4 rounded-3">
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
                            <BiPlus className="me-2" />
                            Thêm
                        </Button>
                    </div>
                </div>

                <Table hover responsive>
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

                                            <span
                                                onClick={() => row.user ? handleUserModalOpen(row?.user) : handleUserModalOpen(row)}
                                                style={{
                                                    padding: '8px',
                                                    backgroundColor: '#F1F3F4',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                            >
                                                {row.user ? <BiCheck size={16} color="green" /> : <BiUser size={16} />}
                                            </span>
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


            {/* BranchModal */}
            <BranchModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                handleData={handleModalSubmit}
                initialValues={initialValues}
            />

            {/* UserModal */}
            <UserModal
                showModal={showUserModal}
                closeModal={() => setShowUserModal(false)}
                initialValues={initialValues}
                handleData={handleSetRole}
            />

            <RenderPagination
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </>
    );
};




export default BranchListPage;
