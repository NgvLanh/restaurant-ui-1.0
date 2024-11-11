import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { createTable, deleteTable, getAllTablesPageable, updateTable } from "../../../services/TableService/TableService";
import TableModal from "./Modals/TableModal";

const TableStatus = new Map([
    ["AVAILABLE", "Bàn còn trống"],
    ["OCCUPIED", "Bàn đang được sử dụng"],
    ["RESERVED", "Bàn đã được đặt trước"],
    ["OUT_OF_SERVICE", "Bàn không sử dụng được"]
]);

const TableListPage = () => {

    const [tables, settables] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);


    useEffect(() => {
        fetchtables();
    }, [currentPage]);

    const fetchtables = async () => {
        const response = await getAllTablesPageable(currentPage, pageSize);
        setTotalPages(response?.data?.totalPages);
        settables(response?.data?.content);
    }

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrentPage(0);
    }

    const handleModalSubmit = async (data) => {
        const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (initialValues) {
            const response = await updateTable(initialValues?.id, data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        } else {
            const response = await createTable(data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        }
        setInitialValues(null);
        fetchtables();
    };

    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá bàn này');
        if (result) {
            const response = await deleteTable(id);
            if (response?.status) {
                AlertUtils.success('Xoá thành công!');
            } else {
                AlertUtils.error('Xoá thất bại!');
            }
        }
        fetchtables();
        setCurrentPage(0);
    }

    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    return (
        <>
            <PageHeader title="Danh sách bàn" />

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
                            <th className="text-center">Số bàn</th>
                            <th className="text-center">Số ghế</th>
                            <th className="text-center">Trạng thái bàn</th>
                            <th className="text-center">Khu vực</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables?.length > 0 ? (
                            tables?.map((row, index) => (
                                <tr key={row.id} className="align-middle">
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <span style={{
                                            backgroundColor: 'pink',
                                            display: 'block',
                                            textAlign: 'center',
                                            borderRadius: '50%',
                                        }}>
                                            {row.number}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            backgroundColor: 'skyblue',
                                            display: 'block',
                                            textAlign: 'center',
                                            borderRadius: '50%',
                                        }}>
                                            {row.seats}
                                        </span>
                                    </td>
                                    <td>{TableStatus.get(row.tableStatus)}</td>
                                    <td>
                                        {row.zone?.name ? row.zone?.name + ' / ' + row.zone?.address : 'Chưa xác định'}
                                    </td>
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
                                <td colSpan={5} className="text-center">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <TableModal
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

export default TableListPage