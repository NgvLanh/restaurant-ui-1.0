import { BiEdit, BiGridAlt, BiPlus } from "react-icons/bi";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { Button, Form, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import CategoryModal from "./Modals/CategoryModal";
import { uploadFile } from "../../../services/UploadFileService/UploadFileService";
import { CiBoxList } from "react-icons/ci";
import { createDish, deleteDish, getAllDishesPageable, updateDish } from "../../../services/DishService/DishService";
import { formatCurrency, formatDate } from "../../../utils/FormatUtils";
import Switch from "react-switch";
import MenuModal from "./Modals/MenuModal";

const MenuListPage = () => {

  const [dishes, setDishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE - 4 || 6);
  const [isGridView, setIsGridView] = useState(true);

  const toggleGridView = () => {
    setIsGridView((prev) => !prev);
  };

  useEffect(() => {
    fetchDishes();
  }, [currentPage, searchKey]);

  const fetchDishes = async () => {
    const response = await getAllDishesPageable(searchKey, currentPage, pageSize);
    console.log(response);

    setTotalPages(response?.data?.totalPages);
    setDishes(response?.data?.content);
  }

  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(0);
  }

  const handleModalSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.image);
    if (data?.image != null) {
      await uploadFile(formData);
    }
    data.image = data.image?.name || '';
    const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
    if (initialValues) {
      const response = await updateDish(initialValues?.id, data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    } else {
      const response = await createDish(data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    }
    fetchDishes();
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    if (result) {
      const response = await deleteDish(id);
      if (response?.status) {
        AlertUtils.success('Xoá thành công!');
      } else {
        AlertUtils.error('Xoá thất bại!');
      }
    }
    fetchDishes();
  }

  const handleToggleStatus = (id, currentStatus) => {
    console.log(!currentStatus);
    // handleModalSubmit(id, !currentStatus);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Danh mục món ăn" />

      <div className="bg-white shadow-lg p-4 rounded-4">
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
          <div className="action d-flex gap-2">
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
            <Button
              className="d-flex align-items-center rounded-3"
              onClick={toggleGridView}
              style={{
                padding: '10px 16px',
                backgroundColor: '#f5f5f5',
                borderColor: '#ddd',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {!isGridView ? (
                <BiGridAlt style={{ color: 'black' }} />
              ) : (
                <CiBoxList style={{ color: 'black' }} />
              )}
            </Button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid-view">
            <div className="row">
              {dishes?.length > 0 ? (
                dishes.map((item, index) => (
                  <div key={item.id} className="col-lg-3 mb-4 col-md-6">
                    <div className="card shadow-sm"  style={{ height: '380px' }}>
                      <img src={item.image} alt={item.name} className="card-img-top"
                        style={{ minHeight: '200px', maxHeight: '200px', objectFit: 'cover' }} />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <small>Giá: {formatCurrency(item.price)}</small>
                        <p className="card-text">{item.description}</p>
                        {/* <div className="d-flex align-items-center gap-2">
                          <span>Trạng thái:</span>
                          <Switch
                            onChange={() => handleToggleStatus(item.id, item.status)}
                            checked={item.status}
                            offColor="#ccc"
                            onColor="#4CAF50"
                          />
                        </div> */}
                        <div className="d-flex justify-content-between mt-2">
                          <BiEdit
                            size={16}
                            onClick={() => {
                              setInitialValues(item);
                              setShowModal(true);
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                          <MdDelete
                            size={16}
                            onClick={() => { handleDelete(item.id) }}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Không có dữ liệu</p>
              )}
            </div>
          </div>
        ) : (
          <Table striped bordered hover responsive className="shadow-sm rounded">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên món ăn</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dishes?.length > 0 ? (
                dishes.map((row, index) => (
                  <tr key={row.id} className="align-middle">
                    <td>{index + 1}</td>
                    <td>
                      <img src={row.image} alt={row.name}
                        style={{ minWidth: '250px', maxWidth: '100%', height: '100px' }} />
                    </td>
                    <td>{row.name}</td>
                    <td>{formatCurrency(row.price)}</td>
                    <td>{row.description}</td>
                    <td>
                      <Switch
                        onChange={() => handleToggleStatus(row.id, row.status)}
                        checked={row.status}
                        offColor="#ccc"
                        onColor="#4CAF50"
                      />
                    </td>
                    <td>
                      <span className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
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
                  <td colSpan={7} className="text-center">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

      </div>

      <MenuModal
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

export default MenuListPage