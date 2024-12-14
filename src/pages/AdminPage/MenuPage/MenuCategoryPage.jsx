import { BiEdit, BiGridAlt, BiPlus } from "react-icons/bi";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils/Debounce";
import AlertUtils from "../../../utils/AlertUtils";
import { Button, Form, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import CategoryModal from "./Modals/CategoryModal";
import { createCategory, deleteCategory, getAllCategoriesPageable, updateCategory } from "../../../services/CategoryService/CategoryService";
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
      try {
        const response = await createCategory(data);
        if (response?.status) {
          AlertUtils.success(successMessage);
          setShowModal(false);
        }
      } catch (error) {
        AlertUtils.error(error.response?.data?.message);
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
        AlertUtils.error('Xoá thất bại do ràng buộc dữ liệu');
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
            className="rounded-3"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{
              maxWidth: '350px',
            }}
          />
          <div className="action d-flex gap-2">
            <Button
              className="d-flex align-items-center rounded-3 px-3"
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
              style={{
                backgroundColor: 'transparent',
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
          <div className="grid-view" style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
            <div className="row">
              {categories?.length > 0 ? (
                categories.map((item) => (
                  <div
                    key={item.id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <div
                      className="card rounded-3"
                      style={{
                        width: '100%',
                        border: '1px solid #ddd',
                        overflow: 'hidden',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          height: '180px',
                          width: '100%',
                          objectFit: 'cover',
                          borderBottom: '1px solid #ddd',
                        }}
                      />
                      <div style={{ padding: '15px' }}>
                        <h5
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#333',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.name}
                        </h5>
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#555',
                            maxHeight: '40px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.description}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <BiEdit
                            size={18}
                            onClick={() => {
                              setInitialValues(item);
                              setShowModal(true);
                            }}
                          />
                          <MdDelete
                            size={18}
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p
                  className="text-center w-100"
                  style={{ fontSize: '18px', fontWeight: 'bold', color: '#999' }}
                >
                  Không có dữ liệu
                </p>
              )}
            </div>
          </div>
        ) : (
          <Table hover responsive className="shadow-sm rounded-4">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Ảnh</th>
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
                    <td className="text-center">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="rounded-3"
                        style={{ maxWidth: '250px', width: '100%', height: '100px' }}
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