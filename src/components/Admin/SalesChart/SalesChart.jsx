import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { getMonthlyRevenue } from '../../../services/DashboardService/DashboardService';
import AlertUtils from '../../../utils/AlertUtils';

export default function SalesChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const [InvoicesMonthData, setMonthTotalData] = useState([]);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        fetchMonthlyRevenue();
    }, []);

    const fetchMonthlyRevenue = async () => {
        try {
            const response = await getMonthlyRevenue();
            const months = response.data?.map((item) => item.month);
            const invoicesMonth = response.data?.map((item) => item.totalRevenue);
            setMonths(months);
            setMonthTotalData(invoicesMonth);
        } catch (error) {
            AlertUtils.info('Lỗi tải dữ liệu');
        }
    };

    useEffect(() => {
        if (months.length > 0 && InvoicesMonthData.length > 0) {
            const ctx = canvasRef.current.getContext('2d');
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
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [InvoicesMonthData, months]);

    return <canvas ref={canvasRef} />;
}
