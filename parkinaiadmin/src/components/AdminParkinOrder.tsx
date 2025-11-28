import React, { useState, useEffect } from "react";
import "../css/admin.css";

interface ParkingOrder {
  id: number;
  user_id: number;
  lot_id: number;
  slot_id: number;
  vehicle_id: number;
  lot_name: string;
  slot_code: string;
  vehicle_plate: string;
  start_time: string;
  end_time: string;
  status: string;
  price: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

interface OrdersResponse {
  list: ParkingOrder[];
  total: number;
}

interface AdminParkinOrderProps {
  userRole?: string;
}

const AdminParkinOrder: React.FC<AdminParkinOrderProps> = ({ userRole = "" }) => {
  const [orders, setOrders] = useState<ParkingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<ParkingOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("");

  const itemsPerPage = 10;

  const fetchOrders = React.useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      let url = `https://newparkai-production.up.railway.app/backend/parkin/v1/parking-orders?page=${currentPage}&limit=${itemsPerPage}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (filterStatus !== "") {
        url += `&status=${filterStatus}`;
      }

      if (filterPaymentStatus !== "") {
        url += `&payment_status=${filterPaymentStatus}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      
      // Sort by start_time (newest first)
      const sortedOrders = (data.list || []).sort((a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
      );
      
      setOrders(sortedOrders);
      setTotal(data.total || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterStatus, filterPaymentStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: "#FFA500",
      confirmed: "#00D4AA",
      completed: "#28a745",
      cancelled: "#dc3545",
      active: "#007bff",
    };

    return (
      <span
        style={{
          background: statusColors[status] || "#6c757d",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusColors: { [key: string]: string } = {
      pending: "#FFA500",
      paid: "#28a745",
      failed: "#dc3545",
      refunded: "#6f42c1",
    };

    return (
      <span
        style={{
          background: statusColors[paymentStatus] || "#6c757d",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {paymentStatus}
      </span>
    );
  };

  const handleViewDetails = (order: ParkingOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDeleteOrder = async (orderId: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this parking order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `https://newparkai-production.up.railway.app/backend/parkin/v1/parking-orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the orders list
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      setError(err instanceof Error ? err.message : "Failed to delete order");
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handlePaymentStatusFilter = (paymentStatus: string) => {
    setFilterPaymentStatus(paymentStatus);
    setCurrentPage(1);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="admin-container">
        <div className="loading-container">Loading parking orders...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Parking Orders Management</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-number-1">{total}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-container">
          Error: {error}
          <button onClick={fetchOrders} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="admin-controls">
        <div className="control-group">
          <label className="control-label">Search</label>
          <input
            type="text"
            placeholder="Search by lot name, vehicle plate, or slot code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control-input"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="control-select"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Filter by Payment</label>
          <select
            value={filterPaymentStatus}
            onChange={(e) => handlePaymentStatusFilter(e.target.value)}
            className="control-select"
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Parking Lot</th>
              <th>Slot</th>
              <th>Vehicle</th>
              <th>Time Period</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className="lot-info">
                    <strong>{order.lot_name}</strong>
                  </div>
                </td>
                <td>
                  <div className="slot-info">
                    <strong>{order.slot_code}</strong>
                  </div>
                </td>
                <td>
                  <div className="vehicle-info">
                    <strong>{order.vehicle_plate}</strong>
                  </div>
                </td>
                <td>
                  <div className="time-info">
                    <div>
                      <strong>Start:</strong> {formatDate(order.start_time)}
                    </div>
                    <div>
                      <strong>End:</strong> {formatDate(order.end_time)}
                    </div>
                  </div>
                </td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{getPaymentStatusBadge(order.payment_status)}</td>
                <td>
                  <strong>{formatPrice(order.price)}</strong>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="btn-view"
                      title="View Details"
                    >
                      👁️
                    </button>
                    {userRole !== "USER" && userRole !== "role_mentor" && (
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="btn-delete"
                        title="Delete Order"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && !loading && (
          <div className="no-data">No parking orders found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages} ({total} total orders)
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Order Details - #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-field-label">Order Information</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Order ID:</strong> #{selectedOrder.id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {selectedOrder.user_id}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {formatDate(selectedOrder.created_at)}
                  </p>
                  <p>
                    <strong>Updated:</strong>{" "}
                    {formatDate(selectedOrder.updated_at)}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Parking Information</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Parking Lot:</strong> {selectedOrder.lot_name} (ID:{" "}
                    {selectedOrder.lot_id})
                  </p>
                  <p>
                    <strong>Slot:</strong> {selectedOrder.slot_code} (ID:{" "}
                    {selectedOrder.slot_id})
                  </p>

                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Time Period</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Start Time:</strong>{" "}
                    {formatDate(selectedOrder.start_time)}
                  </p>
                  <p>
                    <strong>End Time:</strong>{" "}
                    {formatDate(selectedOrder.end_time)}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Status & Payment</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Order Status:</strong>{" "}
                    {getStatusBadge(selectedOrder.status)}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {getPaymentStatusBadge(selectedOrder.payment_status)}
                  </p>
                  <p>
                    <strong>Price:</strong> {formatPrice(selectedOrder.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParkinOrder;
