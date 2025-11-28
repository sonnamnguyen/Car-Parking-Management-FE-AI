import React, { useState, useEffect } from "react";
import "../css/admin.css";

interface ServiceOrder {
  id: number;
  user_id: number;
  lot_id: number;
  service_id: number;
  vehicle_id: number;
  lot_name: string;
  service_name: string;
  vehicle_plate: string;
  scheduled_time: string;
  status: string;
  price: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

interface ServiceOrdersResponse {
  list: ServiceOrder[];
  total: number;
}

interface AdminServiceOrderProps {
  userRole?: string;
}

const AdminServiceOrder: React.FC<AdminServiceOrderProps> = ({ userRole = "" }) => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
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

      let url = `https://newparkai-production.up.railway.app/backend/parkin/v1/service-orders?page=${currentPage}&page_size=${itemsPerPage}`;

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

      const data: ServiceOrdersResponse = await response.json();
      setOrders(data.list || []);
      setTotal(data.total || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching service orders:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterStatus, filterPaymentStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatPrice = (price: number) => {
    if (price == null || isNaN(price)) return "N/A";
    try {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    } catch (error) {
      return `${price} VND`;
    }
  };

  const getStatusBadge = (status: string) => {
    // Safety check for undefined or null status
    if (!status) {
      status = "unknown";
    }

    const statusColors: { [key: string]: string } = {
      pending: "#FFA500",
      confirmed: "#00D4AA",
      in_progress: "#007bff",
      completed: "#28a745",
      cancelled: "#dc3545",
      unknown: "#6c757d",
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
        {status.replace("_", " ")}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    // Safety check for undefined or null paymentStatus
    if (!paymentStatus) {
      paymentStatus = "unknown";
    }

    const statusColors: { [key: string]: string } = {
      pending: "#FFA500",
      paid: "#28a745",
      failed: "#dc3545",
      refunded: "#6f42c1",
      unknown: "#6c757d",
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

  const handleViewDetails = (order: ServiceOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDeleteOrder = async (orderId: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this service order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `https://newparkai-production.up.railway.app/backend/parkin/v1/service-orders/${orderId}`,
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
      console.error("Error deleting service order:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete service order"
      );
    }
  };

  const canDelete = userRole !== "role_mentor" && userRole !== "USER";

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
        <div className="loading-container">Loading service orders...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Service Orders Management</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Service Orders</h3>
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
            placeholder="Search by service name, lot name, or vehicle plate..."
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
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
              <th>Order ID</th>
              <th>Service</th>
              <th>Parking Lot</th>
              <th>Vehicle</th>
              <th>Scheduled Time</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  <div className="service-info">
                    <strong>{order.service_name}</strong>
                  </div>
                </td>
                <td>
                  <div className="lot-info">
                    <strong>{order.lot_name}</strong>
                  </div>
                </td>
                <td>
                  <div className="vehicle-info">
                    <strong>{order.vehicle_plate}</strong>
                  </div>
                </td>
                <td>
                  <div className="time-info">
                    {formatDate(order.scheduled_time)}
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
                    {canDelete && (
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
          <div className="no-data">No service orders found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages} ({total} total service orders)
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

      {/* Service Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Service Order Details - #{selectedOrder.id}
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
                <label className="modal-field-label">Service Information</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Service:</strong> {selectedOrder.service_name} (ID:{" "}
                    {selectedOrder.service_id})
                  </p>
                  <p>
                    <strong>Parking Lot:</strong> {selectedOrder.lot_name} (ID:{" "}
                    {selectedOrder.lot_id})
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {selectedOrder.vehicle_plate} (ID:{" "}
                    {selectedOrder.vehicle_id})
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Schedule</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Scheduled Time:</strong>{" "}
                    {formatDate(selectedOrder.scheduled_time)}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Status & Payment</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Service Status:</strong>{" "}
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

export default AdminServiceOrder;
