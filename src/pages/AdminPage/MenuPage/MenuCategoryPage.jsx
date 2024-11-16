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
    if (data?.image != null) {
      await uploadFile(formData);
    }
    data.image = data.image?.name || '';
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
            {/* Hiển thị dạng lưới */}
            <div className="row">
              {categories?.length > 0 ? (
                categories.map((item, index) => (
                  <div key={item.id} className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
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
                            onClick={() => {
                              handleDelete(item.id);
                            }}
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
          <Table borderless hover responsive className="shadow-sm rounded-4">
            {/* Hiển thị dạng danh sách */}
            <thead style={{ backgroundColor: '#f5f5f5' }}>
              <tr>
                <th className="text-center">STT</th>
                <th>Ảnh</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th className="text-center">Tuỳ chọn</th>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 ? (
                categories.map((row, index) => (
                  <tr key={row.id} className="align-middle">
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{ minWidth: '250px', maxWidth: '100%', height: '100px' }}
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td className="text-center">
                      <span className="d-flex justify-content-center align-items-center gap-3">
                        <span
                          onClick={() => {
                            setInitialValues(row);
                            setShowModal(true);
                          }}
                          style={{
                            padding: '8px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <BiEdit size={16} />
                        </span>
                        <span
                          onClick={() => {
                            handleDelete(row.id);
                          }}
                          style={{
                            padding: '8px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
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
                  <td colSpan={5} className="text-center">Không có dữ liệu</td>
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
  );

}

export default MenuCategoryPage