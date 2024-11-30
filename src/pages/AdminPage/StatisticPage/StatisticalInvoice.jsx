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
import React, { useEffect, useState } from "react";
import { getMonthlyOrderStatistics } from "../../../services/Statistics/Statistics";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatisticalInvoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceData2, setInvoiceData2] = useState([]);
  const [months, setMonths] = useState([]);
  const [data, setData] = useState(null);


  const fakeData = [
    { month: "January", totalInvoices: 150 },
    { month: "February", totalInvoices: 120 },
    { month: "March", totalInvoices: 180 },
    { month: "April", totalInvoices: 200 },
    { month: "May", totalInvoices: 250 },
    { month: "June", totalInvoices: 210 },
  ];

  useEffect(() => {
    fetchMonthOrders();
  }, []);

  const fetchMonthOrders = async () => {
    const response = await getMonthlyOrderStatistics();
    console.log(response.data);
    const months = response.data?.map((item) => item[0]);
    const invoiceCounts = response.data?.map((item) => item[1]);
    const invoiceCounts2 = response.data?.map((item) => item[2]);
    setMonths(months);
    setInvoiceData(invoiceCounts);
    setInvoiceData2(invoiceCounts2);
  }

  const barDataInvoice = {
    labels: months.map((month) => `${month}`),
    datasets: [
      {
        label: "Hoá đơn ăn tại nhà hàng",
        data: invoiceData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Hoá đơn mua online",
        data: invoiceData2,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <h6 className="mb-4" style={{ fontSize: "25px", fontWeight: "bold", color: "#342E37" }}>
        Thống kê số hóa đơn theo tháng
      </h6>

      {/* Biểu đồ Bar */}
      <Col lg={12} md={12} className="mb-4">
        <Card className="z-index-2" style={{ backgroundColor: "#F9F9F9", border: "0px", minHeight: "300px" }}>
          <Card.Header className="p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent" style={{ border: "0px" }}>
            <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Bar
                data={barDataInvoice}
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
            <h6 className="mb-0" style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}>
              Số hóa đơn theo từng tháng
            </h6>
            <hr className="dark horizontal" />
            <div className="d-flex">
              <p className="mb-0 text-sm" style={{ fontWeight: "inherit", color: "#342E37" }}>
                Tổng số hóa đơn trong năm
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Bảng thống kê */}
      <Col lg={12} md={12}>
        <Card style={{ backgroundColor: "#FFFFFF" }}>
          <Card.Body>
            <h6 className="mb-4" style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}>
              Bảng thống kê số hóa đơn
            </h6>
            <Table striped bordered={false} hover responsive>
              <thead style={{ backgroundColor: "#FFFFFF" }}>
                <tr>
                  <th>Tháng</th>
                  <th>Số hóa đơn tại nhà hàng</th>
                  <th>Số hóa đơn mua online</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, index) => (
                  <tr key={index}>
                    <td>{month}</td>
                    <td>{invoiceData[index]}</td>
                    <td>{invoiceData2[index]}</td>
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

export default StatisticalInvoice;
