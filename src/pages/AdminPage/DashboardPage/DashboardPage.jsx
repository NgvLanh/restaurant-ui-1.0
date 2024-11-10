import { Card } from "react-bootstrap"
import OverviewCard from "../../../components/Admin/OverviewCard/OverviewCard"
import PageHeader from "../../../components/Admin/PageHeader/PageHeader"
import SalesChart from "../../../components/Admin/SalesChart/SalesChart"

const DashboardPage = () => {
    return (
        <>
            <PageHeader title="Bản điều khiển" />
            <div className="d-flex flex-wrap mt-4">
                <OverviewCard title="Total Order Value" value={19000000} subtitle="New Orders" />
                <OverviewCard title="Total Order Value" value={19000000} subtitle="New Orders" />
                <OverviewCard title="Total Order Value" value={19000000} subtitle="New Orders" />
                <OverviewCard title="Total Order Value" value={19000000} subtitle="New Orders" />
                {/* Tạo thêm các `OverviewCard` khác nếu cần */}
            </div>

            <div className="mt-4 row">
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Biểu đồ</Card.Title>
                            <Card.Subtitle>01/2024 - 06/2024</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <SalesChart />
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Có xu hướng tăng 5,2% trong tháng này
                        </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card>
                        <Card.Header>
                            <Card.Title>Hoá đơn gần đây</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {/* Hiển thị bảng hóa đơn */}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default DashboardPage