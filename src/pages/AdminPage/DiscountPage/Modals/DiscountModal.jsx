import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const TableModal = ({ showModal, closeModal, initialValues, handleData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialValues) {
      setValue("code", initialValues.code);
      setValue("quantity", initialValues.quantity);
      setValue("endDate", initialValues.endDate);
      setValue("startDate", initialValues.startDate);
      setValue("discountMethod", initialValues.discountMethod);
      setValue("quota", initialValues.quota);
      setValue("value", initialValues.value);
    } else {
      reset();
    }
  }, [initialValues]);

  // Xử lý sự kiện gửi form
  const onSubmit = (data) => {
    data = {
      ...data,
      branch: JSON.parse(localStorage.getItem("branch_info")),
    };
    handleData(data);
    
  };
  const startDate = watch("startDate");
  const value = watch("value");
  // Xử lý reset form
  const handleReset = async () => {
    reset();
  };

  return (
    <Modal show={showModal} onHide={() => closeModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialValues ? "Cập nhật mã giảm giá" : "Thêm mã giam"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="code">
                <Form.Label>Mã giảm</Form.Label>
                <Form.Control 
                type="text"
                 placeholder="Nhập mã giảm giá"
                 {...register("code", {
                    required: "Số lượng không được để trống",
                  })}
                  isInvalid={errors.code}
                 />
                  <Form.Control.Feedback type="invalid">
                  {errors.code?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="quantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập số lượng"
                  {...register("quantity", {
                    required: "Số lượng không được để trống",
                    min: { value: 0, message: "Số lượng từ 0 trở lên" },
                    valueAsNumber: true,
                  })}
                  isInvalid={errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="startDate">
                <Form.Label>Ngày áp dụng</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Chọn ngày áp dụng"
                  {...register("startDate", {
                    required: "Vui lòng chọn ngày áp dụng",
                    validate: {
                      isFutureDate: (value) =>
                        new Date(value) >= new Date() ||
                        "Ngày áp dụng phải là ngày hôm nay hoặc tương lai",
                    },
                  })}
                  isInvalid={errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="endDate">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Chọn ngày kết thúc"
                  {...register("endDate", {
                    required: "Vui lòng chọn ngày kết thúc",
                    validate: {
                      isFutureDate: (value) =>
                        new Date(value) >= new Date() ||
                        "Ngày kết thúc phải là ngày hiện tại hoặc tương lai",
                      isAfterApplyDate: (value) =>
                        !startDate ||
                        new Date(value) > new Date(startDate) ||
                        "Ngày kết thúc phải sau với ngày áp dụng",
                    },
                  })}
                  isInvalid={errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="discountMethod">
                <Form.Label>Phương thức</Form.Label>
                <Form.Select
                  {...register("discountMethod", {
                    required: "Vui lòng chọn phương thức",
                  })}
                  isInvalid={errors.discountMethod}
                >
                  <option value="PERCENTAGE">Giảm giá phần trăm</option>
                  <option value="FIXED_AMOUNT">Giảm giá cụ thể</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.discountMethod?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="quota">
                <Form.Label>Hạn mức</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập số lượng"
                  {...register("quota", {
                    required: "Hạn mức không được để trống",
                    min: {
                      value: 1000,
                      message: "Hạn mức phải từ 1000 trở lên",
                    },
                    validate: {
                      lessThanLimit: (quota) =>
                        !value ||
                        parseInt(quota) < parseInt(value) ||
                        "Hạn mức phải nhỏ hơn Giá trị",
                    },
                    valueAsNumber: true,
                  })}
                  isInvalid={errors.quota}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quota?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="value">
                <Form.Label>Giá trị</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập số lượng"
                  {...register("value", {
                    required: "Giá trị không được để trống",
                    min: {
                      value: 1000,
                      message: "Giá trị phải từ 1000 trở lên",
                    },
                    valueAsNumber: true,
                  })}
                  isInvalid={errors.value}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.value?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-3">
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TableModal;
