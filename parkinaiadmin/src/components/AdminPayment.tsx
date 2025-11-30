import React, { useState, useEffect } from "react";
import "../css/admin.css";

interface Payment {
  id: number;
  money: string;
  bank_name: string;
  bank_number: string;
  description: string;
  day: string;
}

// Mock payment data - 25 accounts (5 people x 5 transactions each)
const mockPayments: Payment[] = [
  // Nguyễn Hoàng Trung Nguyên - 51D36349
  {
    id: 1,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2411 1900 2000 51D36349",
    day: "2025-11-24T17:37:00.000Z",
  },
  {
    id: 2,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 2611 0800 0900 51D36349",
    day: "2025-11-25T15:39:00.000Z",
  },
  {
    id: 3,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0212 0800 0900 51D36349",
    day: "2025-11-27T20:41:00.000Z",
  },
  {
    id: 4,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0312 0800 0900 51D36349",
    day: "2025-11-27T20:42:00.000Z",
  },
  {
    id: 5,
    money: "20000",
    bank_name: "Vietcombank",
    bank_number: "1031190743",
    description: "GXG PD 0412 0800 0900 51D36349",
    day: "2025-11-26T20:42:70.000Z",
  },
  
  // Nguyễn Phi Hùng - 61A93625
  {
    id: 6,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2411 1900 2000 61A93625",
    day: "2025-11-24T17:07:00.000Z",
  },
  {
    id: 7,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2711 0730 0830 61A93625",
    day: "2025-11-26T22:28:00.000Z",
  },
  {
    id: 8,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2711 1800 2000 61A93625",
    day: "2025-11-26T22:28:01.000Z",
  },
  {
    id: 9,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2811 1200 1300 61A93625",
    day: "2025-11-26T22:43:00.000Z",
  },
  {
    id: 10,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "22880112233",
    description: "GXG PD 2911 1200 1300 61A93625",
    day: "2025-11-26T23:25:00.000Z",
  },
  
  // Kiều Duy Minh Khôi - 51K65832
  {
    id: 11,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 2511 1200 1400 51K65832",
    day: "2025-11-25T14:25:00.000Z",
  },
  {
    id: 12,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0312 1200 1400 51K65832",
    day: "2025-11-27T14:12:00.000Z",
  },
  {
    id: 13,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 3011 1200 1400 51K65832",
    day: "2025-11-28T23:05:00.000Z",
  },
  {
    id: 14,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0112 1200 1400 51K65832",
    day: "2025-11-28T23:06:00.000Z",
  },
  {
    id: 15,
    money: "45000",
    bank_name: "Vietcombank",
    bank_number: "1014154577",
    description: "GXG PD 0212 1200 1400 51K65832",
    day: "2025-11-28T23:07:00.000Z",
  },
  
  // Đỗ Hùng Cường - 50H93877
  {
    id: 16,
    money: "45000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2411 1800 2000 50H93877",
    day: "2025-11-24T16:59:00.000Z",
  },
  {
    id: 17,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2611 1200 1300 50H93877",
    day: "2025-11-25T17:42:00.000Z",
  },
  {
    id: 18,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2611 0800 0900 50H93877",
    day: "2025-11-25T17:43:00.000Z",
  },
  {
    id: 19,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 2911 0800 0900 50H93877",
    day: "2025-11-26T22:45:00.000Z",
  },
  {
    id: 20,
    money: "20000",
    bank_name: "VPBank",
    bank_number: "265070426",
    description: "GXG PD 3011 0800 1100 50H93877",
    day: "2025-11-26T22:46:00.000Z",
  },
  
  // Lê Hoàng Chung - 76A22158
  {
    id: 21,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0312 1500 1600 76A22158",
    day: "2025-11-27T16:45:00.000Z",
  },
  {
    id: 22,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0312 1900 2100 76A22158",
    day: "2025-11-27T16:47:00.000Z",
  },
  {
    id: 23,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0412 1500 1600 76A22158",
    day: "2025-11-27T16:49:00.000Z",
  },
  {
    id: 24,
    money: "45000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0412 1900 2100 76A22158",
    day: "2025-11-27T16:51:00.000Z",
  },
  {
    id: 25,
    money: "20000",
    bank_name: "MB Bank",
    bank_number: "000026623734",
    description: "GXG PD 0512 1500 1600 76A22158",
    day: "2025-11-27T16:53:00.000Z",
  },


  
];

const AdminPayment: React.FC = () => {
  const [orders, setOrders] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Payment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;
  const totalItems = mockPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const loadPaymentData = React.useCallback(async () => {
    setLoading(true);
    // Simulate 1-2s loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Sort all payments by day (newest first)
    const sortedPayments = [...mockPayments].sort((a, b) => 
      new Date(b.day).getTime() - new Date(a.day).getTime()
    );

    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    let filteredOrders = sortedPayments.slice(startIdx, endIdx);

    // Apply search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.bank_number.includes(searchTerm) ||
          order.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setOrders(filteredOrders);
    setError(null);
    setLoading(false);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    loadPaymentData();
  }, [loadPaymentData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number.parseFloat(price));
  };

  const handleViewDetails = (order: Payment) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const loadingSpinner = (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading data...</p>
    </div>
  );

  if (loading && orders.length === 0) {
    return (
      <div className="admin-container">
        <div className="loading-container">{loadingSpinner}</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Transaction Management</h1>
      </div>

      {error && (
        <div className="error-container">
          Error: {error}
          <button onClick={loadPaymentData} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="admin-controls">
        <div className="control-group">
          <label htmlFor="search" className="control-label">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by bank number, bank name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control-input"
          />
        </div>
      </div>

      <div className="admin-table-container">
        {loading && (
          <div className="table-loading-overlay">
            {loadingSpinner}
          </div>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Số Tiền</th>
              <th>Tên Ngân Hàng</th>
              <th>Số Tài Khoản</th>
              <th>Mô Tả</th>
              <th>Ngày</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>
                  <strong>{formatPrice(order.money)}</strong>
                </td>
                <td>{order.bank_name}</td>
                <td>
                  <strong>{order.bank_number}</strong>
                </td>
                <td>{order.description}</td>
                <td>{formatDate(order.day)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="btn-view"
                      title="View Details"
                    >
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && !loading && (
          <div className="no-data">No payments found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage + 1} of {totalPages} ({totalItems} total transaction)
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="pagination-button"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Payment Details - #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <label className="modal-field-label">Payment Information</label>
                <div className="modal-fields">
                  <div className="modal-field">
                    <span className="field-name">ID:</span>
                    <span className="field-value">#{selectedOrder.id}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Số Tiền:</span>
                    <span className="field-value">{formatPrice(selectedOrder.money)}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Tên Ngân Hàng:</span>
                    <span className="field-value">{selectedOrder.bank_name}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Số Tài Khoản:</span>
                    <span className="field-value">{selectedOrder.bank_number}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Mô Tả:</span>
                    <span className="field-value">{selectedOrder.description}</span>
                  </div>
                  <div className="modal-field">
                    <span className="field-name">Ngày:</span>
                    <span className="field-value">{formatDate(selectedOrder.day)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="modal-button modal-button-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayment;
