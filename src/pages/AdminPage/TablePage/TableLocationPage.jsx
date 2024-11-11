import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import ZoneModal from "./Modals/ZoneModal";
import { createZone, deleteZone, getAllZonesPageable, updateZone } from "../../../services/zoneservice/ZoneService";

const TableLocationPage = () => {

    const [zones, setZones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);


    useEffect(() => {
        fetchZones();
    }, [searchKey, currentPage]);

    const fetchZones = async () => {
        const response = await getAllZonesPageable(searchKey, currentPage, pageSize);
        setTotalPages(response?.data?.totalPages);
        setZones(response?.data?.content);
    }

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrentPage(0);
    }

    const handleModalSubmit = async (data) => {
        const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
        if (initialValues) {
            const response = await updateZone(initialValues?.id, data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        } else {
            const response = await createZone(data);
            if (response?.status) {
                AlertUtils.success(successMessage);
                setShowModal(false);
            } else {
                AlertUtils.error(response?.message);
            }
        }
        fetchZones();
    };

    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá bàn này');
        if (result) {
            const response = await deleteZone(id);
            if (response?.status) {
                AlertUtils.success('Xoá thành công!');
            } else {
                AlertUtils.error('Xoá thất bại!');
            }
        }
        fetchZones();
        setCurrentPage(0);
    }

    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

    return (
        <>
            <PageHeader title="Danh Khu vực" />

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
                            <th className="text-center">Khu vực</th>
                            <th className="text-center">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones?.length > 0 ? (
                            zones?.map((row, index) => (
                                <tr key={row.id} className="align-middle">
                                    <td className="text-center">{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.address}</td>
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

            <ZoneModal
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

export default TableLocationPage