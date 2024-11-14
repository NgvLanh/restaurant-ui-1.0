import { Bar } from "react-chartjs-2";
import { Col, Card, Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { getCountTableReversion } from "../../../services/Statistics/Statistics";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const StatisticalTablePage = () => {
  const [TableData, setTableData] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await getCountTableReversion();
        const monthsFromAPI = data?.map((item) => item.date);
        const tableCounts = data?.map((item) => item.total_reservations);

        setMonths(monthsFromAPI);
        setTableData(tableCounts);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu bảng:", error);
      }
    };
    fetchTableData();
  }, []);

  const barDataTable = {
    labels: months.map((date) => `Tháng: ${date}`),
    datasets: [
      {
        label: "Số bàn đã đặt",
        data: TableData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h6 className="mb-4" style={{ fontSize: "25px", fontWeight: "bold", color: "#342E37" }}>
        Thống kê số bàn đã đặt trong tuần
      </h6>

      <Col lg={12} md={12} className="mb-4">
        <Card className="z-index-2" style={{ backgroundColor: "#F9F9F9", border: "0px", minHeight: "300px" }}>
          <Card.Header className="p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent" style={{ border: "0px" }}>
            <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Bar
                data={barDataTable}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
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
              Số bàn đã đặt theo ngày
            </h6>
            <hr className="dark horizontal" />
            <div className="d-flex">
              <p className="mb-0 text-sm" style={{ fontWeight: "inherit", color: "#342E37" }}>
                Tổng số bàn đã đặt trong tuần
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={12} md={12}>
        <Card style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0" }}>
          <Card.Body>
            <h6 className="mb-4" style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}>
              Bảng thống kê số bàn đã đặt
            </h6>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "#E3F2FD" }}>
                <tr>
                  <th>Ngày</th>
                  <th>Số bàn đã đặt</th>
                </tr>
              </thead>
              <tbody>
                {months.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{TableData[index]}</td>
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

export default StatisticalTablePage;
