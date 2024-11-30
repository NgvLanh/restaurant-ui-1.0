import { Bar } from "react-chartjs-2";
import { Col, Card, Table } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, PointElement, LineElement } from "chart.js";
import { useEffect, useState } from "react";
import { getReversionByWeek } from "../../../services/Statistics/Statistics";

const StatisticalTablePage = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, PointElement, LineElement);
  const [week, setWeek] = useState(null);

  useEffect(() => {
    fetchReservationWeekly();
  }, []);

  const fetchReservationWeekly = async () => {
    const response = await getReversionByWeek();
    setWeek(response?.data?.map(e => e[1]));
  }

  const mockBarDataWeek = {
    labels: [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ nhật",
    ],
    datasets: [
      {
        label: "Số bàn đã đặt",
        data: week || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 127, 80, 0.6)",
          "rgba(211, 211, 211, 0.6)",
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
                data={mockBarDataWeek}
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
                Tổng số bàn đã đặt trong tuần {week?.length > 0 && week?.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue;
                }, 0)}
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
                {mockBarDataWeek.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{mockBarDataWeek.datasets[0].data[index]}</td>
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
