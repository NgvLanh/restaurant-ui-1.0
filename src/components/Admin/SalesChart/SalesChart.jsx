import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { getMonthlyRevenue } from '../../../services/DashboardService/DashboardService';

export default function SalesChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const [InvoicesMonthData, setMonthTotalData] = useState([]);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu doanh thu hàng tháng
        const fetchMonthlyRevenue = async () => {
            try {
                const data = await getMonthlyRevenue(); // Dùng hàm getMonthlyRevenue thay cho getCountUser
                const monthsFromAPI = data?.map((item) => item.thang);
                const invoicesMonth = data?.map((item) => item.tong_doanh_thu);

                setMonths(monthsFromAPI);
                setMonthTotalData(invoicesMonth);

            } catch (error) {
                console.error("Lỗi lấy dữ liệu doanh thu:", error);
            }
        };

        fetchMonthlyRevenue();
    }, []);

    useEffect(() => {
        // Khởi tạo biểu đồ mới trên canvas chỉ khi có dữ liệu
        if (months.length > 0 && InvoicesMonthData.length > 0) {
            const ctx = canvasRef.current.getContext('2d');

            // Khởi tạo biểu đồ mới trên canvas
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months.map((thang) => `Tháng: ${thang}`),
                    datasets: [
                        {
                            label: 'Doanh thu (VNĐ)',
                            data: InvoicesMonthData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderRadius: 8,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true },
                        tooltip: { enabled: true },
                        title: {
                            display: true,
                            text: 'Thống Kê Doanh Thu Theo Tháng',
                            font: {
                                size: 18,
                            },
                        },
                    },
                    scales: {
                        x: { title: { display: true, text: 'Tháng' } },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Doanh thu (VNĐ)' },
                            ticks: {
                                callback: (value) => value.toLocaleString('vi-VN') + ' VNĐ',
                            },
                        },
                    },
                },
            });
        }

        // Hủy biểu đồ khi component bị gỡ bỏ hoặc khi biểu đồ cần được làm mới
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [InvoicesMonthData, months]); // Sử dụng state để làm mới biểu đồ

    return <canvas ref={canvasRef} />;
}
