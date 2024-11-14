import { useEffect, useMemo, useState } from "react";
import AlertUtils from "../../../utils/AlertUtils";
import { debounce } from "../../../utils/Debounce";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Button, Form, Table } from "react-bootstrap";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import DiscountModal from "./Modals/DiscountModal";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscountsByBranchId,
  getAllDiscountsPage,
  updateDiscount,
} from "../../../services/DiscountService/DiscountService";
import { formatCurrency, formatDate } from "../../../utils/FormatUtils";

const DiscountListPage = () => {
  const [discounts, setDiscount] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

  const fetchDiscount = async () => {
    try {
      const response = await getAllDiscountsByBranchId(currentPage, pageSize);
      setDiscount(response?.data?.content);
      setTotalPages(response?.data?.totalPages);
    } catch (e) {
      console.warn("Lỗi gọi API", e);
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, [currentPage]);

  // const handleSearch = (key) => {
  //   setSearchKey(key);
  //   setCurrentPage(0);
  // };

  const handleModalSubmit = async (data) => {
    const successMessage = initialValues
      ? "Cập nhật thành công"
      : "Thêm mới thành công";

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
      AlertUtils.error("Có lỗi xảy ra khi gửi yêu cầu.");
    }
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm("Bạn có chắc chắn muốn xoá mã giảm giá này");
    if (result) {
      const response = await deleteDiscount(id);
      if (response?.status) {
        AlertUtils.success("Xoá thành công!");
        fetchDiscount();
      } else {
        AlertUtils.error("Xoá thất bại!");
      }
    }
  };

  // const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Danh sách mã giảm giá" />
      <div className="bg-white shadow rounded-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            // onChange={(e) => debouncedSearch(e.target.value)}
            style={{ maxWidth: "350px", borderRadius: "8px" }}
          />
          <div className="action d-flex gap-2">
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
              <th>STT</th>
              <th>Mã</th>
              <th>Số lượng</th>
              <th>Ngày áp dụng</th>
              <th>Ngày kết thúc</th>
              <th>Phương thức</th>
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
                  <td>
                    {row.discountMethod === "PERCENTAGE"
                      ? "Giảm giá phần trăm"
                      : row.discountMethod === "FIXED_AMOUNT"
                        ? "Giảm giá cụ thể"
                        : "Chưa xác định"}
                  </td>
                  <td>{formatCurrency(row.quota)}</td>
                  <td>{row.discountMethod === 'PERCENTAGE' ? `${row.value} %` : `${formatCurrency(row.value)}`}</td>
                  <td className="text-center">
                    <span
                      className="d-flex justify-content-center align-items-center gap-3"
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        onClick={() => {
                          setInitialValues(row);
                          setShowModal(true);
                        }}
                      >
                        <BiEdit size={16} />
                      </span>
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
                <td colSpan={9} className="text-center">
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
