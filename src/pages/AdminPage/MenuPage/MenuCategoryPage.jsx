import { BiEdit, BiGridAlt, BiPlus } from "react-icons/bi";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { Button, Form, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import CategoryModal from "./Modals/CategoryModal";
import { createCategory, deleteCategory, getAllCategories, getAllCategoriesPageable, updateCategory } from "../../../services/CategoryService/CategoryService";
import { uploadFile } from "../../../services/UploadFileService/UploadFileService";
import { CiBoxList } from "react-icons/ci";


const MenuCategoryPage = () => {

  const [categories, setCategories] = useState([]);
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
    fetchCategories();
  }, [currentPage, searchKey]);

  const fetchCategories = async () => {
    const response = await getAllCategoriesPageable(searchKey, currentPage, pageSize);
    setTotalPages(response?.data?.totalPages);
    setCategories(response?.data?.content);
  }

  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(0);
  }

  const handleModalSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.image);
    await uploadFile(formData);
    data.image = data.image.name;
    const successMessage = initialValues ? 'Cập nhật thành công' : 'Thêm mới thành công';
    if (initialValues) {
      const response = await updateCategory(initialValues?.id, data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    } else {
      const response = await createCategory(data);
      if (response?.status) {
        AlertUtils.success(successMessage);
        setShowModal(false);
      } else {
        AlertUtils.error(response?.message);
      }
    }
    fetchCategories();
  };

  const handleDelete = async (id) => {
    const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá trạng thái này');
    if (result) {
      const response = await deleteCategory(id);
      if (response?.status) {
        AlertUtils.success('Xoá thành công!');
      } else {
        AlertUtils.error('Xoá thất bại!');
      }
    }
    fetchCategories();
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <>
      <PageHeader title="Danh mục món ăn" />

      <div className="bg-white shadow rounded-lg p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{ maxWidth: '350px', borderRadius: '8px' }}
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
            <Button
              className="d-flex align-items-center rounded-3"
              onClick={toggleGridView}
            >
              {!isGridView ? <BiGridAlt /> : <CiBoxList />}
            </Button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid-view">
            {/* Hiển thị dạng lưới */}
            <div className="row">
              {categories?.length > 0 ? (
                categories.map((item, index) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                      <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <div className="d-flex justify-content-between">
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
            {/* Hiển thị dạng danh sách */}
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 ? (
                categories.map((row, index) => (
                  <tr key={row.id} className="align-middle">
                    <td>{index + 1}</td>
                    <td>
                      <img src={row.image} alt={row.name} style={{ minWidth: '250px', maxWidth: '100%', height: '100px' }} />
                    </td>
                    <td>{row.name}</td>
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
                  <td colSpan={4} className="text-center">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      <CategoryModal
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

export default MenuCategoryPage