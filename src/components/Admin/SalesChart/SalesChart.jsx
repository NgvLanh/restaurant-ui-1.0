import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function SalesChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        // Khởi tạo biểu đồ mới trên canvas
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Desktop',
                        data: [300, 500, 700, 800, 1200, 1500],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderRadius: 8,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                },
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                },
            },
        });

        // Hủy biểu đồ khi component bị gỡ bỏ hoặc khi biểu đồ cần được làm mới
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return <canvas ref={canvasRef} />;
}
