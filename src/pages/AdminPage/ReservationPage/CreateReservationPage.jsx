import { useState } from "react";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import RenderPagination from "../../../components/Admin/RenderPagination/RenderPagination";
import { Button, Form, Modal, Card } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import CreateTableModal from "./Modals/CreateTableModal";

const CreateReservationPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(import.meta.env.VITE_PAGE_SIZE || 10);

    return (
        <>
            <PageHeader title="Thêm đặt bàn" />

            <div className="bg-white shadow-lg p-4 rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
                    <Form.Control
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                            //   setSelectDate(e.target.value);
                        }}
                        style={{
                            maxWidth: "350px",
                        }}
                        className="rounded-3"
                        lang="vi"
                    />
                    <div className="action d-flex gap-2">
                        <Button
                            className="d-flex align-items-center rounded-3"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <BiPlus className="me-2" />
                            Thêm
                        </Button>
                    </div>
                </div>

                <div className="row px-2">
                    {/* {orders?.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id} className="col-md-12 mb-2 rounded-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between">
                    Hóa đơn #{order.id} -  Bàn: {order.table?.number}
                    <Button
                      variant="ghost"
                      className="rounded-3"
                      onClick={() => {}}
                    >
                      <span className="text-primary">Thêm món</span>
                    </Button>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Thời gian: {formatDateTime(order.time)}
                  </Card.Subtitle>
                  <Card.Text>Trạng thái: Đang phục vụ</Card.Text>
                  <Card.Text>
                    Khách hàng: {order.fullName} - {order.phoneNumber}
                  </Card.Text>
                  <Card.Text>
                    Bàn: {order.table?.number} - {order.table?.zone?.name} - {order.table?.zone?.address}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Không có hóa đơn nào.</p>
          )} */}
                </div>
            </div>

            <RenderPagination
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />

            <CreateTableModal
                showModal={showModal}
                setShowModal={setShowModal}
                // onSubmit={onSubmit}
                // tables={tables}
            />


        </>
    );
};

export default CreateReservationPage;
