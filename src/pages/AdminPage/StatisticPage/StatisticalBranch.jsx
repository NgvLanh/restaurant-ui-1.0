import { useState, useEffect } from "react";
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
import { getBranchesCount } from "../../../services/Statistics/Statistics"; // API service

const StatisticalBranchStatus = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  const [statuses, setStatuses] = useState([]);
  const [branchStatusData, setBranchStatusData] = useState([]);

  useEffect(() => {
    const fetchBranchStatus = async () => {
      try {
        const data = await getBranchesCount();
        const statusesData = data?.map(item => item.BranchStatus);
        const countsData = data?.map(item => item.TotalBranches);
        setStatuses(statusesData);
        setBranchStatusData(countsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi nhánh:", error);
      }
    };

    fetchBranchStatus();
  }, []);

  const barDataStatus = {
    labels: statuses,
    datasets: [
      {
        label: "Số lượng chi nhánh",
        data: branchStatusData,
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
                  plugins: { legend: { display: false } },
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
        <Card style={{
            backgroundColor: "#FFFFFF", 
          }}>
          <Card.Body>
            <h6 className="mb-4" style={{ fontSize: "20px", fontWeight: "bold", color: "#342E37" }}>
              Bảng thống kê chi nhánh theo trạng thái
            </h6>
            <Table striped bordered={false} hover responsive>
              <thead style={{ backgroundColor: "#FFFFFF" }}>
                <tr>
                  <th>Trạng thái</th>
                  <th>Số lượng chi nhánh</th>
                </tr>
              </thead>
              <tbody>
                {statuses.length > 0 ? (
                  statuses.map((status, index) => (
                    <tr key={index}>
                      <td>{status}</td>
                      <td>{branchStatusData[index]}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="2">Không có dữ liệu</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default StatisticalBranchStatus;
