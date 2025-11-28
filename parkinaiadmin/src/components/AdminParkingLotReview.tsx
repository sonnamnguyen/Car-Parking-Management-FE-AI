import React, { useState, useEffect } from "react";
import "../css/admin.css";

interface ParkingLotReview {
  id: number;
  lot_id: number;
  lot_name: string;
  user_id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsResponse {
  list: ParkingLotReview[];
  total: number;
}

const AdminParkingLotReview: React.FC = () => {
  const [reviews, setReviews] = useState<ParkingLotReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedReview, setSelectedReview] = useState<ParkingLotReview | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | "">("");

  const itemsPerPage = 10;

  const fetchReviews = React.useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      let url = `https://newparkai-production.up.railway.app/backend/parkin/v1/parking-lot-reviews?page=${currentPage}&limit=${itemsPerPage}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (filterRating !== "") {
        url += `&rating=${filterRating}`;
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

      const data: ReviewsResponse = await response.json();
      setReviews(data.list || []);
      setTotal(data.total || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterRating]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleViewDetails = (review: ParkingLotReview) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleDeleteReview = async (reviewId: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await fetch(
        `https://newparkai-production.up.railway.app/backend/parkin/v1/parking-lot-reviews/${reviewId}`,
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

      // Refresh the reviews list
      fetchReviews();
      alert("Review deleted successfully");
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "" : "empty"}`}>
        ★
      </span>
    ));
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleRatingFilter = (rating: number | "") => {
    setFilterRating(rating);
    setCurrentPage(1);
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="admin-container">
        <div className="loading-container">Loading parking lot reviews...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Parking Lot Reviews Management</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Reviews</h3>
            <p className="stat-number-1">{total}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-container">
          Error: {error}
          <button onClick={fetchReviews} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="admin-controls">
        <div className="control-group">
          <label className="control-label">Search</label>
          <input
            type="text"
            placeholder="Search by lot name, username, or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control-input"
          />
        </div>

        <div className="control-group">
          <label className="control-label">Filter by Rating</label>
          <select
            value={filterRating}
            onChange={(e) =>
              handleRatingFilter(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="control-select"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Parking Lot</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment Preview</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>
                  <div className="lot-info">
                    <strong>{review.lot_name}</strong>
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <strong>{review.username}</strong>
                  </div>
                </td>
                <td>
                  <div className="star-rating">
                    {renderStars(review.rating)}
                    <span className="rating-number">({review.rating}/5)</span>
                  </div>
                </td>
                <td>
                  <div className="comment-preview">
                    {review.comment.length > 50
                      ? `${review.comment.substring(0, 50)}...`
                      : review.comment}
                  </div>
                </td>
                <td>{formatDate(review.created_at)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleViewDetails(review)}
                      className="btn-view"
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="btn-delete"
                      title="Delete Review"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reviews.length === 0 && !loading && (
          <div className="no-data">No parking lot reviews found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {currentPage} of {totalPages} ({total} total reviews)
          </span>

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
      )}

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Review Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-field-label">
                  Parking Lot Information
                </label>
                <div className="modal-field-value">
                  <p>
                    <strong>Name:</strong> {selectedReview.lot_name}
                  </p>
                  <p>
                    <strong>Lot ID:</strong> {selectedReview.lot_id}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">User Information</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Username:</strong> {selectedReview.username}
                  </p>
                  <p>
                    <strong>User ID:</strong> {selectedReview.user_id}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Review Details</label>
                <div className="modal-field-value">
                  <p>
                    <strong>Rating:</strong>
                    <span className="star-rating">
                      {renderStars(selectedReview.rating)} (
                      {selectedReview.rating}/5)
                    </span>
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(selectedReview.created_at)}
                  </p>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-field-label">Comment</label>
                <div className="modal-comment">{selectedReview.comment}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParkingLotReview;
