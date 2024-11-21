import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const TableModal =  ({ showModal, closeModal, initialValues, handleData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        code: initialValues.code,
        quantity: initialValues.quantity,
        startDate: initialValues.startDate,
        endDate: initialValues.endDate,
        discountMethod: initialValues.discountMethod,
        quota: initialValues.quota,
        value: initialValues.value,
      });
    } else {
      reset({
        code: generateRandomCode(),
        quantity: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        discountMethod: "",
        quota: "",
        value: "",
      });
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
  const quota = watch("quota");

  const handleReset = async () => {
    if (initialValues) {
      reset({
        code: initialValues.code,
        quantity: initialValues.quantity,
        startDate: initialValues.startDate,
        endDate: initialValues.endDate,
        discountMethod: initialValues.discountMethod,
        quota: initialValues.quota,
        value: initialValues.value,
      });
    } else {
      reset({
        code: generateRandomCode(),
        quantity: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        discountMethod: "",
        quota: "",
        value: "",
      });
    }
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(
      { length: 16 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  return (
    <Modal show={showModal} onHide={() => closeModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialValues ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
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
                    maxLength: {
                      value: 16,
                      message: "Mã giảm không được vượt quá 16 ký tự",
                    },
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
                      isFutureDate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= today ||
                          "Ngày áp dụng phải là ngày hôm nay hoặc tương lai"
                        );
                      },
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
                      isFutureDate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= today ||
                          "Ngày kết thúc phải là ngày hôm nay hoặc tương lai"
                        );
                      },
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
                  <option value="">Chọn loại giảm giá</option>
                  <option value="PERCENTAGE">Giảm giá phần trăm</option>
                  <option value="FIXED_AMOUNT">Giảm giá tiền</option>
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
                      lessThanValue: (value) => {
                        const valueField = watch("value");
                        return (
                          !valueField || 
                          parseInt(value) < parseInt(valueField) ||
                          "Hạn mức phải nhỏ hơn Giá trị"
                        );
                      },
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
                  placeholder="Nhập giá trị"
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
