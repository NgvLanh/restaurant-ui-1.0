import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import DiscountModal from "./Modals/DiscountModal";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscountsByBranchIdAndMonth,
  updateDiscount,
} from "../../../services/DiscountService/DiscountService";
import { formatCurrency, formatDate } from "../../../utils/FormatUtils";

const DiscountListPage = () => {
  const [discounts, setDiscount] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

  const fetchDiscount = async () => {
    try {
      const response = await getAllDiscountsByBranchIdAndMonth('', currentPage, pageSize);
      console.log(response);

      setDiscount(response?.data?.content);
      setTotalPages(response?.data?.totalPages);
    } catch (e) {
      console.warn("Lỗi gọi API", e);
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, [currentPage]);

  const handleModalSubmit = async (data) => {
    const successMessage = initialValues
      ? "Cập nhật thành công"
      : "Thêm mới thành công";
    useEffect;
    try {
      const response = initialValues
        ? await updateDiscount(initialValues.id, data)
        : await createDiscount(data);

      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
        fetchDiscount();
      } else {
        AlertUtils.error(response?.message);
      }
    } catch (e) {
      AlertUtils.error(e);
    }
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm("Bạn có chắc chắn muốn xoá mã giảm giá này");
    if (result) {
      try {
        const response = await deleteDiscount(id);
        if (response?.status) {
          AlertUtils.success("Xoá thành công!");
          fetchDiscount();
        }
      } catch (error) {
        AlertUtils.error(error.response?.data?.message);
      }
    }
  };

  const handleFilterDiscount = async (value) => {
    const response = await getAllDiscountsByBranchIdAndMonth(value, currentPage, pageSize);
    setDiscount(response?.data?.content);
  }

  // const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Danh sách mã giảm giá" />
      <div className="bg-white shadow rounded-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex justify-content-center align-items-center mt-4">
            <Form className="d-flex gap-3">
              <Form.Group controlId="fromDate">
                <Form.Label>Thời gian</Form.Label>
                <Form.Control
                  type="month"
                  defaultValue={new Date().toISOString().slice(0, 7)}
                  className="rounded-3 shadow-sm"
                  style={{ minWidth: '250px' }}
                  lang="vi"
                  onChange={(e) => handleFilterDiscount(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="mt-5">
            <Button
              className="rounded-3"
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

        <Table hover responsive className="shadow-sm rounded">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Số lượng</th>
              <th>Ngày áp dụng</th>
              <th>Ngày kết thúc</th>
              <th>Hạn mức giảm giá</th>
              <th>Giá trị giảm giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {discounts?.length > 0 ? (
              discounts?.map((row, index) => (
                <tr key={row.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{row.code}</td>
                  <td>{row.quantity}</td>
                  <td>{formatDate(row.startDate)}</td>
                  <td>{formatDate(row.endDate)}</td>
                  <td>{formatCurrency(row.quota)}</td>
                  <td>
                    {row.discountMethod === "PERCENTAGE"
                      ? `${row.value} %`
                      : `${formatCurrency(row.value)}`}
                  </td>
                  <td className="text-center">
                    <span
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <MdDelete size={16} />
                      </span>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-3">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <DiscountModal
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
};

export default DiscountListPage;
