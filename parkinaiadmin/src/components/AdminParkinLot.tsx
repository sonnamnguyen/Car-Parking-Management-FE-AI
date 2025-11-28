import React, { useEffect, useState } from "react";
import {
  fetchParkingSlots,
  updateParkingSlot,
  createParkingSlot,
  deleteParkingSlot,
  testBackendConnection,
  ParkingSlot,
  ParkingSlotsResponse,
} from "../api/parkingSlots";
import "../css/admin.css";

const AdminParkinLot: React.FC = () => {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<ParkingSlot | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFloor, setFilterFloor] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "visual">("table");

  // Form state
  const [formData, setFormData] = useState({
    lot_id: "",
    lot_name: "",
    code: "",
    is_available: true,
    slot_type: "standard",
    floor: "",
  });

  const loadParkingSlots = async () => {
    try {
      setLoading(true);
      setError("");
      const response: ParkingSlotsResponse = await fetchParkingSlots();
      setParkingSlots(response.list);
    } catch (err: any) {
      setError(err.message || "Failed to load parking slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParkingSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const slotData = {
        ...formData,
        lot_id: parseInt(formData.lot_id),
      };

      if (editingSlot) {
        await updateParkingSlot(editingSlot.id, slotData);
      } else {
        await createParkingSlot(slotData);
      }

      await loadParkingSlots();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save parking slot");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slot: ParkingSlot) => {
    setEditingSlot(slot);
    setFormData({
      lot_id: slot.lot_id.toString(),
      lot_name: slot.lot_name,
      code: slot.code,
      is_available: slot.is_available,
      slot_type: slot.slot_type,
      floor: slot.floor,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this parking slot?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteParkingSlot(id);
      await loadParkingSlots();
    } catch (err: any) {
      setError(err.message || "Failed to delete parking slot");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      lot_id: "",
      lot_name: "",
      code: "",
      is_available: true,
      slot_type: "standard",
      floor: "",
    });
    setEditingSlot(null);
    setShowCreateForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Filter parking slots
  const filteredSlots = parkingSlots.filter((slot) => {
    const matchesSearch =
      slot.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.lot_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFloor = !filterFloor || slot.floor === filterFloor;
    const matchesType = !filterType || slot.slot_type === filterType;
    const matchesAvailable =
      !filterAvailable ||
      (filterAvailable === "available" && slot.is_available) ||
      (filterAvailable === "occupied" && !slot.is_available);

    return matchesSearch && matchesFloor && matchesType && matchesAvailable;
  });

  // Get unique values for filters
  const floors = [...new Set(parkingSlots.map((slot) => slot.floor))];
  const slotTypes = [...new Set(parkingSlots.map((slot) => slot.slot_type))];

  if (loading && parkingSlots.length === 0) {
    return (
      <div className="admin-container">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading parking slots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Parking Slot Management</h2>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              📋 Table View
            </button>
            <button
              className={`view-btn ${viewMode === "visual" ? "active" : ""}`}
              onClick={() => setViewMode("visual")}
            >
              🚗 Visual View
            </button>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Add New Slot
          </button>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={testBackendConnection}
          >
            🔍 Test Backend
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-error">
          <p>{error}</p>
          <button onClick={() => setError("")}>×</button>
        </div>
      )}

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by code or lot name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={filterFloor}
            onChange={(e) => setFilterFloor(e.target.value)}
            className="admin-select"
          >
            <option value="">All Floors</option>
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="admin-select"
          >
            <option value="">All Types</option>
            {slotTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.value)}
            className="admin-select"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number-1">{parkingSlots.length}</div>
          <div className="stat-label">Total Slots</div>
        </div>
        <div className="stat-card">
          <div className="stat-number-1">
            {parkingSlots.filter((slot) => slot.is_available).length}
          </div>
          <div className="stat-label-1">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number-1">
            {parkingSlots.filter((slot) => !slot.is_available).length}
          </div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="stat-card">
          <div className="stat-number-1">{floors.length}</div>
          <div className="stat-label">Floors</div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>
                {editingSlot ? "Edit Parking Slot" : "Create New Parking Slot"}
              </h3>
              <button className="admin-modal-close" onClick={resetForm}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Lot ID</label>
                  <input
                    type="number"
                    name="lot_id"
                    value={formData.lot_id}
                    onChange={handleInputChange}
                    required
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label>Lot Name</label>
                  <input
                    type="text"
                    name="lot_name"
                    value={formData.lot_name}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label>Slot Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="admin-input"
                    placeholder="e.g., A1-01"
                  />
                </div>
                <div className="form-group">
                  <label>Floor</label>
                  <input
                    type="text"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    required
                    className="admin-input"
                    placeholder="e.g., 1"
                  />
                </div>
                <div className="form-group">
                  <label>Slot Type</label>
                  <select
                    name="slot_type"
                    value={formData.slot_type}
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="disabled">Disabled</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={handleInputChange}
                      className="admin-checkbox"
                    />
                    Available
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={resetForm}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="admin-btn admin-btn-primary"
                >
                  {loading ? "Saving..." : editingSlot ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Parking Lot View */}
      {viewMode === "visual" && (
        <div className="parking-lot-visual">
          {floors.map((floor) => (
            <div key={floor} className="parking-floor">
              <h3 className="floor-title">Floor {floor}</h3>
              <div className="parking-grid">
                {filteredSlots
                  .filter((slot) => slot.floor === floor)
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className={`parking-spot ${
                        slot.is_available ? "available" : "occupied"
                      } ${slot.slot_type}`}
                      onClick={() => handleEdit(slot)}
                      title={`${slot.code} - ${slot.slot_type} - ${
                        slot.is_available ? "Available" : "Occupied"
                      }`}
                    >
                      <div className="spot-code">{slot.code}</div>
                      <div className="spot-type">{slot.slot_type}</div>
                      <div className="spot-car">
                        {slot.is_available ? "🅿️" : "🚗"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="parking-legend">
            <h4>Legend:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-spot available standard"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-spot occupied standard"></div>
                <span>Occupied</span>
              </div>
              <div className="legend-item">
                <div className="legend-spot available premium"></div>
                <span>Premium</span>
              </div>
              <div className="legend-item">
                <div className="legend-spot available disabled"></div>
                <span>Disabled</span>
              </div>
              <div className="legend-item">
                <div className="legend-spot available electric"></div>
                <span>Electric</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parking Slots Table */}
      {viewMode === "table" && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Lot ID</th>
                <th>Lot Name</th>
                <th>Floor</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSlots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>
                  <td>
                    <span className="slot-code">{slot.code}</span>
                  </td>
                  <td>{slot.lot_id}</td>
                  <td>{slot.lot_name || "—"}</td>
                  <td>
                    <span className="floor-badge">Floor {slot.floor}</span>
                  </td>
                  <td>
                    <span className={`type-badge type-${slot.slot_type}`}>
                      {slot.slot_type}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        slot.is_available
                          ? "status-available"
                          : "status-occupied"
                      }`}
                    >
                      {slot.is_available ? "Available" : "Occupied"}
                    </span>
                  </td>
                  <td>{new Date(slot.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(slot)}
                        className="admin-btn admin-btn-small admin-btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(slot.id)}
                        className="admin-btn admin-btn-small admin-btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSlots.length === 0 && !loading && (
            <div className="admin-empty">
              <p>No parking slots found</p>
            </div>
          )}
        </div>
      )}

      <div className="admin-footer">
        <p>
          Showing {filteredSlots.length} of {parkingSlots.length} parking slots
        </p>
      </div>
    </div>
  );
};

export default AdminParkinLot;
