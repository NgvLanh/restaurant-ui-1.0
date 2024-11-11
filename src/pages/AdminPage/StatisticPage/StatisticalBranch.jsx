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

const StatisticalBranchStatus = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  // Trạng thái và số lượng chi nhánh cho mỗi trạng thái
  const statuses = ["Hoạt động", "Tạm ngưng", "Đang bảo trì", "Đóng cửa"];
  const branchStatusData = [15, 5, 8, 2]; // Dữ liệu mẫu cho số lượng chi nhánh theo trạng thái

  const barDataStatus = {
    labels: statuses,
    datasets: [
      {
        label: "Số lượng chi nhánh",
        data: branchStatusData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Tiêu đề */}
      <h6 className="mb-4" style={{ fontSize: "25px", fontWeight: "bold", color: "#342E37" }}>
        Thống kê số lượng chi nhánh theo trạng thái
      </h6>

      {/* Biểu đồ Bar */}
      <Col lg={12} md={12} className="mb-4">
        <Card className="z-index-2" style={{ backgroundColor: "#F9F9F9", border: "0px", minHeight: "300px" }}>
          <Card.Header className="p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent" style={{ border: "0px" }}>
            <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Bar
                data={barDataStatus}
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
              Số lượng chi nhánh theo trạng thái
            </h6>
            <hr className="dark horizontal" />
            <div className="d-flex">
              <p className="mb-0 text-sm" style={{ fontWeight: "inherit", color: "#342E37" }}>
                Thống kê số lượng chi nhánh dựa trên trạng thái hoạt động
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Bảng thống kê */}
      <Col lg={12} md={12}>
        <Card style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0" }}>
          <Card.Body>
            <h6 className="mb-4" style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}>
              Bảng thống kê chi nhánh theo trạng thái
            </h6>
            <Table striped bordered hover responsive>
              <thead style={{ backgroundColor: "#E3F2FD" }}>
                <tr>
                  <th>Trạng thái</th>
                  <th>Số lượng chi nhánh</th>
                </tr>
              </thead>
              <tbody>
                {statuses.map((status, index) => (
                  <tr key={index}>
                    <td>{status}</td>
                    <td>{branchStatusData[index]}</td>
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

export default StatisticalBranchStatus;
