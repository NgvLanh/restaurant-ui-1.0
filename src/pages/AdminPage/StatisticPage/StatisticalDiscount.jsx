import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Col, Card, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getDiscountCount } from "../../../services/Statistics/Statistics";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatisticalDiscount = () => {
  const [discountData, setDiscountData] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const data = await getDiscountCount();
        const monthsFromAPI = data?.map((item) => item.month);
        const discountCounts = data?.map((item) => item.discountCount);

        setMonths(monthsFromAPI);
        setDiscountData(discountCounts);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu giảm giá:", error);
        setLoading(false);
      }
    };
    fetchDiscountData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const barDataDiscount = {
    labels: months.map((month) => `Tháng: ${month}`),
    datasets: [
      {
        label: "Tổng số lượng giảm giá",
        data: discountData,
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <h6
        className="mb-4"
        style={{ fontSize: "25px", fontWeight: "bold", color: "#342E37" }}
      >
        Thống kê tổng số lượng giảm giá theo tháng
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
                data={barDataDiscount}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
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
              Tổng số lượng giảm giá
            </h6>
            <hr className="dark horizontal" />
            <div className="d-flex">
              <p
                className="mb-0 text-sm"
                style={{ fontWeight: "inherit", color: "#342E37" }}
              >
                Tổng số lượng giảm giá theo từng tháng
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Bảng thống kê */}
      <Col lg={12} md={12}>
        <Card
          style={{
            backgroundColor: "#FFFFFF", 
          }}
        >
          <Card.Body>
            <h6
              className="mb-4"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#342E37",
              }}
            >
              Bảng thống kê tổng số lượng giảm giá
            </h6>
            <Table striped bordered={false} hover responsive>
              <thead
                style={{
                  backgroundColor: "#FFFFFF",
   
                }}
              >
                <tr>
                  <th>Tháng</th>
                  <th>Số lượng giảm giá</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, index) => (
                  <tr key={index}>
                    <td>{month}</td>
                    <td>{discountData[index]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default StatisticalDiscount;
