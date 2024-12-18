import { BiCheck, BiEdit, BiPlus, BiUser } from "react-icons/bi";
import { MdDelete } from "react-icons/md"; // Import MdDelete for delete icon
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { Button, Form, Table } from "react-bootstrap";
import { useState, useEffect, useMemo } from "react";
import EmployeeModal from "./Modals/EmployeeModal";
import { getEmployee, deleteEmployee, updateEmployee, createEmployee } from "../../../services/UserService/UserService";
import AlertUtils from "../../../utils/AlertUtils"; // Import AlertUtils
import { debounce } from "../../../utils/Debounce";
import ChooseBranchModal from "./Modals/ChooseBranchModal";
import { changeRoleService } from "../../../services/AuthService/AuthService";
import { useNavigate } from "react-router-dom";

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [pageSize] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [showChoseBranchModal, setShowChoseBranchModal] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const fetchEmployee = async () => {
        const response = await getEmployee(currentPage, pageSize, searchKey);
        setTotalPages(response?.data?.totalPages);
        setEmployees(response?.data?.content);
    };

    useEffect(() => {
        fetchEmployee();
    }, [currentPage, pageSize, searchKey]);

    const handleModalSubmit = async (data) => {
        const branch = JSON.parse(localStorage.getItem('branch_info'));
        const { confirmPassword, ...dataWithoutConfirmPassword } = data;
        const payload = { ...dataWithoutConfirmPassword, branch };

        if (initialValues) {
            try {
                const response = await updateEmployee(initialValues?.id, payload);
                if (response?.status) {
                    AlertUtils.success('Cập nhật nhân viên thành công');
                } else {
                    AlertUtils.error('Cập nhật thất bại');
                }
            } catch (error) {
                console.error('Error during update:', error);
                const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật';
                AlertUtils.error(errorMessage);
            }
        } else {
            try {
                const response = await createEmployee(payload);
                if (response?.status) {
                    AlertUtils.success('Thêm nhân viên thành công');
                    setShowModal(false);
                }
            } catch (error) {
                AlertUtils.error(error.response?.data?.message.email
                    || error.response?.data?.message.phoneNumber
                    || error.response?.data?.message.password
                    || error.response?.data?.message
                );
            }
        }

        fetchEmployee();
    };


    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm("Bạn có chắc chắn muốn xoá nhân viên này?");
        if (result) {
            try {
                await deleteEmployee(id);
                AlertUtils.success('Nhân viên đã bị xoá thành công');
                fetchEmployee();
            } catch (error) {
                AlertUtils.error('Đã xảy ra lỗi khi xoá nhân viên');
            }
        }
    };

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrentPage(0);
    };

    const handleChangeRole = async (role, userId) => {
        setUserId(userId);
        if (role === 'EMPLOYEE') {
            const result = await AlertUtils.confirm('Bạn có chắc chắn muốn đổi quyền?');
            if (result) {
                const res = await changeRoleService(userId, 0, 'NON_ADMIN');
                if (res.status) {
                    AlertUtils.success('Câp quyền thành công');
                    setShowChoseBranchModal(false);
                    fetchEmployee();
                    navigate(0);
                }
            }
        } else {
            setShowChoseBranchModal(true);
        }
    }

    const handleChoseBranchModalSubmit = async (branchId, userId) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn đổi quyền?');
        if (result) {
            try {
                const res = await changeRoleService(userId, branchId, 'EMPLOYEE');
                if (res.status) {
                    AlertUtils.success('Câp quyền thành công');
                    setShowChoseBranchModal(false);
                    fetchEmployee();
                    navigate(0);
                }
            } catch (error) {
                AlertUtils.error(error);
            }
        }
    }

    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    return (
        <>
            <PageHeader title="Danh sách nhân viên" />
            <div className="bg-white shadow p-4 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo số điện thoại"
                        style={{
                            maxWidth: "350px",
                        }}
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
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

                <Table hover responsive className="rounded-4">
                    <thead >
                        <tr>
                            <th className="text-center">STT</th>
                            <th>Tên nhân viên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th className="text-center">Tuỳ chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <span
                                                onClick={() => {
                                                    setInitialValues(employee);
                                                    setShowModal(true);
                                                }}
                                                className="btn btn-light"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <BiEdit />
                                            </span>
                                            <span
                                                onClick={() => handleDelete(employee.id)}
                                                className="btn btn-light ms-2"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <MdDelete />
                                            </span>
                                            <span>
                                                <Form.Select
                                                    className="rounded-3"
                                                    defaultValue={employee.roles[0]}
                                                    onChange={(e) => handleChangeRole(e.target.value, employee.id)}
                                                >
                                                    <option value="NON_ADMIN">QL Chi nhánh</option>
                                                    <option value="EMPLOYEE">Nhân viên</option>
                                                </Form.Select>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <EmployeeModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                initialValues={initialValues}
                handleData={handleModalSubmit}
            />

            <RenderPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            <ChooseBranchModal
                showModal={showChoseBranchModal}
                closeModal={() => { setShowChoseBranchModal(false); navigate(0) }}
                userId={userId}
                handleData={handleChoseBranchModalSubmit}
            />

        </>
    );
};

export default EmployeeListPage;
