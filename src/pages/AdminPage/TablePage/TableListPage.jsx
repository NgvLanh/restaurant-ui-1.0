import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { createTable, deleteTable, getAllTablesPageable, updateTable } from "../../../services/TableService/TableService";
import TableModal from "./Modals/TableModal";
import { CiEdit, CiViewList, CiViewTable } from "react-icons/ci";
import { GoTrash } from "react-icons/go";


const TableListPage = () => {

    const [tables, settables] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);
    const [viewMode, setViewMode] = useState('card');


    useEffect(() => {
        fetchtables();
    }, [currentPage]);

    const fetchtables = async () => {
        const response = await getAllTablesPageable(currentPage, pageSize);
        setTotalPages(response?.data?.totalPages);
        settables(response?.data?.content);
    }

    const handleModalSubmit = async (data) => {
        const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (initialValues) {
            const response = await updateTable(initialValues?.id, data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.info(response?.message);
            }
        } else {
            try {
                const response = await createTable(data);
                if (response?.status) {
                    AlertUtils.success(successMessage);
                    setShowModal(false);
                }
            } catch (error) {
                AlertUtils.info(error.response?.data?.message);

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
                AlertUtils.info('Xoá thất bại!');
            }
        }
        fetchtables();
        setCurrentPage(0);
    }


    return (
        <>
            <PageHeader title="Danh sách bàn" />

            <div className="bg-white shadow-lg p-4 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
                    <Form.Select
                        onChange={(e) => {}}
                        style={{
                            maxWidth: '350px',
                        }}
                        className="rounded-3"
                    >
                        <option value="">Tất cả</option>
                        <option value="1">Trống</option>
                        <option value="2">Đẵ đặt</option>
                    </Form.Select>

                    <div className="action d-flex gap-2">
                        <Button
                            className="d-flex align-items-center rounded-3"
                            onClick={() => {
                                setInitialValues(null);
                                setShowModal(true);
                            }}
                        >
                            <BiPlus className="me-2" />
                            Thêm
                        </Button>
                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                            >
                                {viewMode === 'table' ? (
                                    <>
                                        <CiViewList />
                                    </>
                                ) : (
                                    <>
                                        <CiViewTable />
                                    </>
                                )}
                            </Button>
                        </div>

                    </div>
                </div>

                {viewMode === 'card' ? (
                    <div className="row g-3">
                        {tables?.length > 0 ? (
                            tables.map((row, index) => (
                                <div className="col-lg-2 col-md-4" key={row.id}>
                                    <div className="card shadow-sm rounded-3">
                                        <img
                                            src={`/assets/img/—Pngtree—dining table_5635354.png`}
                                            className="card-img-top rounded-top-3"
                                            style={{ maxHeight: "250px", objectFit: "cover" }}
                                        />

                                        <div className="card-body d-flex justify-content-between">
                                            <div className="content">
                                                <h5 className="card-title">Bàn: {row.number}</h5>
                                                <p className="card-text">Số ghế: {row.seats}</p>
                                                <p className="card-text">
                                                    Trạng thái:{" "}
                                                    {row.tableStatus ? (
                                                        <span className="badge bg-success p-2 rounded-3">Trống</span>
                                                    ) : (
                                                        <span className="badge bg-danger p-2 rounded-3">Đã đặt</span>
                                                    )}
                                                </p>
                                                <p className="card-text">
                                                    Khu vực:{" "}
                                                    {row.zone?.name ? (
                                                        `${row.zone.name} / ${row.zone.address}`
                                                    ) : (
                                                        "Chưa xác định"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setInitialValues(row);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <CiEdit size={20} color="brown" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => handleDelete(row.id)}
                                                >
                                                    <GoTrash size={20} color="red" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">Không có dữ liệu</div>
                        )}
                    </div>
                ) : (
                    <Table hover responsive className="rounded-4">
                        <thead >
                            <tr>
                                <th className="text-center">Số bàn</th>
                                <th className="text-center">Số ghế</th>
                                <th className="text-center">Khu vực</th>
                                <th className="text-center">Tuỳ chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables?.length > 0 ? (
                                tables.map((row, index) => (
                                    <tr key={row.id} className="align-middle">
                                        <td className="text-center">
                                            {row.number}
                                        </td>
                                        <td className="text-center">
                                            {row.seats}
                                        </td>
                                        <td className="text-center">
                                            {row.zone?.name ? row.zone?.name + ' / ' + row.zone?.address : 'Chưa xác định'}
                                        </td>

                                        <td className="text-center">
                                            <span className="d-flex justify-content-center align-items-center gap-3" style={{ cursor: 'pointer' }}>
                                                <span
                                                    onClick={() => {
                                                        setInitialValues(row);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <CiEdit size={20} color="brown" />
                                                </span>
                                                <span
                                                    onClick={() => { handleDelete(row.id) }}
                                                >
                                                    <GoTrash size={20} color="red" />
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
                )}

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
    );

}

export default TableListPage