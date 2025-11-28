import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  fetchRevenue,
  fetchTrends,
  fetchStatus,
  RevenueData,
  TrendsData,
  StatusData,
} from "../api/dashboard";
import "../css/dashboard.css";

// Mock payment data for revenue calculation
interface Payment {
  id: number;
  money: string;
  bank_name: string;
  bank_number: string;
  description: string;
  day: string;
}

const mockPayments: Payment[] = [
  // Nguyễn Hoàng Trung Nguyên - 51D36349
  {
    id: 1,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2411 1900 2000 51D36349",
    day: "2025-11-24T17:35:00.000Z",
  },
  {
    id: 2,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2511 1900 2000 51D36349",
    day: "2025-11-25T15:37:00.000Z",
  },
  {
    id: 3,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2611 1900 2000 51D36349",
    day: "2025-11-25T15:39:00.000Z",
  },
  {
    id: 4,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2711 1900 2000 51D36349",
    day: "2025-11-26T20:41:00.000Z",
  },
  {
    id: 5,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2811 1900 2000 51D36349",
    day: "2025-11-26T20:42:00.000Z",
  },
  
  // Nguyễn Phi Hùng - 61A93625
  {
    id: 6,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2411 1900 2000 61A93625",
    day: "2025-11-24T17:05:00.000Z",
  },
  {
    id: 7,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2511 1900 2000 61A93625",
    day: "2025-11-24T17:07:00.000Z",
  },
  {
    id: 8,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2611 1900 2000 61A93625",
    day: "2025-11-24T22:28:00.000Z",
  },
  {
    id: 9,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2711 1900 2000 61A93625",
    day: "2025-11-24T22:43:00.000Z",
  },
  {
    id: 10,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2811 1900 2000 61A93625",
    day: "2025-11-24T23:25:00.000Z",
  },
  
  // Kiều Duy Minh Khôi - 51K65832
  {
    id: 11,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2611 1200 1400 51K65832",
    day: "2025-11-25T14:23:00.000Z",
  },
  {
    id: 12,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2711 1200 1400 51K65832",
    day: "2025-11-25T16:25:00.000Z",
  },
  {
    id: 13,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2811 1200 1400 51K65832",
    day: "2025-11-25T16:47:00.000Z",
  },
  {
    id: 14,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2911 1200 1400 51K65832",
    day: "2025-11-25T16:49:00.000Z",
  },
  {
    id: 15,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 3011 1200 1400 51K65832",
    day: "2025-11-25T16:51:00.000Z",
  },
  
  // Đỗ Hùng Cường - 50H93877
  {
    id: 16,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2611 0800 0900 50H93877",
    day: "2025-11-24T17:37:00.000Z",
  },
  {
    id: 17,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2711 0800 0900 50H93877",
    day: "2025-11-24T17:42:00.000Z",
  },
  {
    id: 18,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2811 0800 0900 50H93877",
    day: "2025-11-25T14:25:00.000Z",
  },
  {
    id: 19,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2911 0800 0900 50H93877",
    day: "2025-11-25T16:53:00.000Z",
  },
  {
    id: 20,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 3011 0800 0900 50H93877",
    day: "2025-11-26T09:15:00.000Z",
  },
  
  // Lê Hoàng Chung - 76A22158
  {
    id: 21,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0312 1500 1600 76A22158",
    day: "2025-11-25T16:45:00.000Z",
  },
  {
    id: 22,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0412 1900 2100 76A22158",
    day: "2025-11-25T16:47:00.000Z",
  },
  {
    id: 23,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0512 1500 1600 76A22158",
    day: "2025-11-25T16:49:00.000Z",
  },
  {
    id: 24,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0612 1500 1600 76A22158",
    day: "2025-11-26T15:39:00.000Z",
  },
  {
    id: 25,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0712 1500 1600 76A22158",
    day: "2025-11-26T20:42:00.000Z",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Get default date range for the past month
  const getDefaultDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 1); // 1 month ago

    const formatDateInput = (date: Date) => {
      return date.toISOString().slice(0, 10); // YYYY-MM-DD format for input[type="date"]
    };

    return {
      startDate: formatDateInput(start),
      endDate: formatDateInput(end),
    };
  };

  const formatDateForAPI = (dateString: string, isEndDate: boolean = false) => {
    return isEndDate ? dateString + " 23:59:59" : dateString + " 00:00:00";
  };

  // Initialize default dates
  useEffect(() => {
    const { startDate: defaultStart, endDate: defaultEnd } =
      getDefaultDateRange();
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadDashboardData = async () => {
      try {
        if (isCancelled) return;
        setLoading(true);

        if (!startDate || !endDate) return;

        const startTime = formatDateForAPI(startDate, false);
        const endTime = formatDateForAPI(endDate, true);

        const [revenue, trends, status] = await Promise.all([
          fetchRevenue("1m", startTime, endTime),
          fetchTrends("1m", startTime, endTime),
          fetchStatus("1m", startTime, endTime),
        ]);

        if (!isCancelled) {
          setRevenueData(revenue);
          setTrendsData(trends);
          setStatusData(status);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "Failed to load dashboard data");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isCancelled = true;
    };
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading-wrapper">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">Loading dashboard data...</div>
        </div>

        {/* Skeleton Loading */}
        <div className="dashboard-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-subtitle"></div>
          </div>

          <div className="skeleton-date-picker">
            <div className="skeleton-date-group">
              <div className="skeleton-line skeleton-label"></div>
              <div className="skeleton-line skeleton-input"></div>
            </div>
            <div className="skeleton-date-group">
              <div className="skeleton-line skeleton-label"></div>
              <div className="skeleton-line skeleton-input"></div>
            </div>
          </div>

          <div className="skeleton-stats">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="skeleton-stat-card">
                <div className="skeleton-line skeleton-stat-title"></div>
                <div className="skeleton-line skeleton-stat-value"></div>
              </div>
            ))}
          </div>

          <div className="skeleton-charts">
            <div className="skeleton-chart">
              <div className="skeleton-line skeleton-chart-title"></div>
              <div className="skeleton-chart-body"></div>
            </div>
            <div className="skeleton-chart">
              <div className="skeleton-line skeleton-chart-title"></div>
              <div className="skeleton-chart-body"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container dashboard-fade-in">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Date Range Picker */}
      <div className="dashboard-date-picker">
        <div className="date-picker-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-picker-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-picker-info">
          <span>
            Showing data from {startDate} to {endDate}
          </span>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="dashboard-cards">
        <div className="dashboard-card revenue-card">
          <div className="card-header">
            <h3>Total Revenue</h3>
            <span className="card-period">Custom Period</span>
          </div>
          <div className="card-value">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(mockPayments.reduce((sum, p) => sum + Number.parseFloat(p.money), 0))}
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="dashboard-card orders-card">
          <div className="card-header">
            <h3>Total Orders</h3>
            <span className="card-period">Custom Period</span>
          </div>
          <div className="card-value">{mockPayments.length}</div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="dashboard-chart-section">
        <h3>Order Trends</h3>
        <div className="chart-container">
          <Line
            data={{
              labels:
                trendsData?.orders?.map((order) => {
                  const date = new Date(order.date);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }) || [],
              datasets: [
                {
                  label: "Orders",
                  data: trendsData?.orders?.map((order) => order.count) || [],
                  borderColor: "#00dcb5",
                  backgroundColor: "rgba(0, 220, 181, 0.1)",
                  tension: 0.3,
                  fill: true,
                  pointBackgroundColor: "#00dcb5",
                  pointBorderColor: "#00606a",
                  pointBorderWidth: 2,
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: "rgba(0, 96, 106, 0.1)",
                  },
                  ticks: {
                    color: "#00606a",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#00606a",
                  },
                },
              },
            }}
            height={200}
          />
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="dashboard-status-section">
        <h3>Order Status Breakdown</h3>
        <div className="status-grid">
          {statusData?.statuses?.map((status, index) => (
            <div key={index} className="status-item">
              <div className="status-label">{status.status}</div>
              <div className="status-count">{status.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
