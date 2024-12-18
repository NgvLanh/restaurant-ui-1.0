import { Bar } from "react-chartjs-2";
import { Col, Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { getDailyOrderStatistics } from "../../../services/Statistics/Statistics";
import { formatCurrency, formatDate } from "../../../utils/FormatUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SettingPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceData2, setInvoiceData2] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchDailyOrders();
  }, []);

  const fetchDailyOrders = async () => {
    const response = await getDailyOrderStatistics();
    console.log(response.data);

    const day = response.data[0]?.[0]; // Ngày hiện tại
    const invoiceCount = response.data[0]?.[1]; // Số hóa đơn tại nhà hàng
    const invoiceCount2 = response.data[0]?.[2]; // Số hóa đơn mua online
    const total = response.data[0]?.[3]; // Tổng số tiền

    setDate(day);
    setInvoiceData(invoiceCount);
    setInvoiceData2(invoiceCount2);
    setTotalAmount(total);
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <h6
        className="mb-4"
        style={{ fontSize: "25px", fontWeight: "bold", color: "#342E37" }}
      >
        Thống kê số hóa đơn theo ngày: {formatDate(date)}
      </h6>

      {/* Biểu đồ Bar */}
      <Col lg={12} md={12} className="mb-4">
        <Card
          className="z-index-2"
          style={{
            backgroundColor: "#F9F9F9",
            border: "0px",
            minHeight: "300px",
          }}
        >
          <Card.Header
            className="p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent"
            style={{ border: "0px" }}
          >
            <div
              className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bar
                data={{
                  labels: [date],
                  datasets: [
                    {
                      label: "Hoá đơn trực tuyến",
                      data: [invoiceData],
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                    {
                      label: "Hoá đơn ăn tại nhà hàng",
                      data: [invoiceData2],
                      backgroundColor: "rgba(153, 102, 255, 0.6)",
                      borderColor: "rgba(153, 102, 255, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
                className="chart-canvas"
                style={{ maxWidth: "100%", width: "100%", height: "250px" }}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <h6
              className="mb-0"
              style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}
            >
              Số hóa đơn trong ngày
            </h6>
            <hr className="dark horizontal" />
          </Card.Body>
        </Card>
      </Col>

      {/* Thông tin chi tiết dưới dạng Card */}
      <div className="d-flex justify-content-between">
        {/* Card 1 */}
        <Card
          className="mb-4"
          style={{
            backgroundColor: "#F9F9F9",
            border: "0px",
            width: "30%",
          }}
        >
          <Card.Body className="text-center">
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#342E37",
              }}
            >
              Hoá đơn trực tuyến
            </h6>
            <p style={{ fontSize: "30px", fontWeight: "bold", color: "#4CAF50" }}>
              {invoiceData}
            </p>
          </Card.Body>
        </Card>

        {/* Card 2 */}
        <Card
          className="mb-4"
          style={{
            backgroundColor: "#F9F9F9",
            border: "0px",
            width: "30%",
          }}
        >
          <Card.Body className="text-center">
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#342E37",
              }}
            >
              Hoá đơn ăn tại nhà hàng
            </h6>
            <p style={{ fontSize: "30px", fontWeight: "bold", color: "#FF9800" }}>
              {invoiceData2}
            </p>
          </Card.Body>
        </Card>

        {/* Card 3 */}
        <Card
          className="mb-4"
          style={{
            backgroundColor: "#F9F9F9",
            border: "0px",
            width: "30%",
          }}
        >
          <Card.Body className="text-center">
            <h6
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#342E37",
              }}
            >
              Tổng số tiền (VNĐ)
            </h6>
            <p style={{ fontSize: "30px", fontWeight: "bold", color: "#E91E63" }}>
              {formatCurrency(totalAmount)}
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SettingPage;
