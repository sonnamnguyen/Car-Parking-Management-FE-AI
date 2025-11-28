import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchUsers,
  searchUsers,
  fetchUserById,
  User,
  UsersResponse,
  UserFilters,
} from "../api/users";
import "../css/users.css";

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // Modal states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingUserDetail, setLoadingUserDetail] = useState<boolean>(false);

  // Check if error is authentication related
  const isAuthError = (errorMessage: string) => {
    return (
      errorMessage.includes("đăng nhập") ||
      errorMessage.includes("token") ||
      errorMessage.includes("authentication")
    );
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle view user details
  const handleViewUser = async (userId: number) => {
    try {
      setLoadingUserDetail(true);
      setShowModal(true);
      const userDetail = await fetchUserById(userId);
      setSelectedUser(userDetail);
    } catch (err) {
      console.error("Error loading user detail:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải thông tin chi tiết người dùng"
      );
      setShowModal(false);
    } finally {
      setLoadingUserDetail(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setLoadingUserDetail(false);
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalUsers / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalUsers);

  // Load users data
  const loadUsers = async (
    page: number = currentPage,
    size: number = pageSize,
    filters?: UserFilters
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Determine if we're filtering
      const hasFilters = filters?.search || filters?.username || filters?.role;
      setIsFiltering(!!hasFilters);

      const response = await fetchUsers(page, size, filters);

      setUsers(response.users);
      setTotalUsers(response.total);
      setCurrentPage(response.page);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách người dùng"
      );
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadUsers(1, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle filter/search
  const handleFilter = () => {
    setCurrentPage(1);
    const filters: UserFilters = {};
    if (searchQuery.trim()) filters.search = searchQuery.trim();
    if (usernameFilter.trim()) filters.username = usernameFilter.trim();
    if (roleFilter) filters.role = roleFilter;
    loadUsers(1, pageSize, filters);
  };

  // Handle search input key press
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const filters: UserFilters = {};
      if (searchQuery.trim()) filters.search = searchQuery.trim();
      if (usernameFilter.trim()) filters.username = usernameFilter.trim();
      if (roleFilter) filters.role = roleFilter;
      loadUsers(page, pageSize, filters);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
    const filters: UserFilters = {};
    if (searchQuery.trim()) filters.search = searchQuery.trim();
    if (usernameFilter.trim()) filters.username = usernameFilter.trim();
    if (roleFilter) filters.role = roleFilter;
    loadUsers(1, newSize, filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setUsernameFilter("");
    setRoleFilter("");
    setCurrentPage(1);
    loadUsers(1, pageSize);
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Get user initials for avatar
  const getUserInitials = (fullName: string, username: string) => {
    if (fullName && fullName.trim()) {
      const names = fullName.trim().split(" ");
      if (names.length >= 2) {
        return (
          names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase()
        );
      }
      return names[0][0].toUpperCase();
    }
    return username[0].toUpperCase();
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="users-container">
        <div className="users-loading">Đang tải danh sách người dùng...</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      {/* Header */}
      <div className="users-header">
        <h1 className="users-title">Quản lý Người dùng</h1>

        {/* Filters */}
        <div className="users-search">
          <div className="search-group">
            <label className="search-label">Username</label>
            <input
              type="text"
              className="search-input"
              placeholder="Lọc theo username..."
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>

          <div className="search-group">
            <label className="search-label">Vai trò</label>
            <select
              className="search-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Tất cả vai trò</option>
              <option value="role_admin">Admin</option>
              <option value="role_user">User</option>
            </select>
          </div>

          <div className="search-buttons">
            <button className="search-button" onClick={handleFilter}>
              🔍 Lọc
            </button>
            {isFiltering && (
              <button className="clear-button" onClick={clearFilters}>
                ✖️ Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary */}
        {isFiltering && (
          <div className="filter-summary">
            Đang lọc:
            {searchQuery && ` Tìm kiếm "${searchQuery}"`}
            {usernameFilter && ` Username "${usernameFilter}"`}
            {roleFilter &&
              ` Vai trò "${roleFilter === "role_admin" ? "Admin" : "User"}"`}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="users-error">
          {error}
          {isAuthError(error) && (
            <div style={{ marginTop: "12px" }}>
              <button
                className="search-button"
                onClick={handleLoginRedirect}
                style={{ background: "#c62828" }}
              >
                Đăng nhập lại
              </button>
            </div>
          )}
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 ? (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Tên đăng nhập</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Số dư ví</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>
                      <div className="user-avatar">
                        {getUserInitials(user.full_name, user.username)}
                      </div>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.full_name || "—"}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "—"}</td>
                    <td>
                      <span
                        className={`role-badge ${user.role.replace(
                          "role_",
                          "role-"
                        )}`}
                      >
                        {user.role === "role_admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td>
                      <span className="wallet-balance">
                        {user.wallet_balance.toLocaleString("vi-VN")}
                      </span>
                    </td>
                    <td className="date-cell">{formatDate(user.created_at)}</td>
                    <td className="actions-cell">
                      <button
                        className="view-button"
                        onClick={() => handleViewUser(user.user_id)}
                        title="Xem chi tiết"
                      >
                        👁️ Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="users-pagination">
            <div className="pagination-info">
              Hiển thị {startItem}-{endItem} trong tổng số {totalUsers} người
              dùng
              {isFiltering && ` (đã lọc)`}
            </div>

            <div className="pagination-controls">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Trước
              </button>

              {renderPaginationButtons()}

              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Sau
              </button>
            </div>

            <div className="page-size-selector">
              <label>Hiển thị:</label>
              <select
                className="page-size-select"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>/ trang</span>
            </div>
          </div>
        </>
      ) : (
        <div className="users-empty">
          <h3>Không tìm thấy người dùng</h3>
          <p>
            {isFiltering
              ? "Không có người dùng nào khớp với bộ lọc hiện tại."
              : "Chưa có người dùng nào trong hệ thống."}
          </p>
          {isFiltering && (
            <button className="search-button" onClick={clearFilters}>
              Hiển thị tất cả người dùng
            </button>
          )}
        </div>
      )}

      {/* User Detail Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Chi tiết người dùng</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            {loadingUserDetail ? (
              <div className="users-loading">
                Đang tải thông tin chi tiết...
              </div>
            ) : selectedUser ? (
              <div className="user-detail">
                {/* Avatar and Basic Info */}
                <div className="user-detail-section">
                  <div className="section-title">👤 Thông tin cơ bản</div>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <div className="user-avatar-large">
                      {getUserInitials(
                        selectedUser.full_name,
                        selectedUser.username
                      )}
                    </div>
                    <h3 style={{ margin: "0 0 8px 0", color: "#00606a" }}>
                      {selectedUser.full_name || selectedUser.username}
                    </h3>
                    <span
                      className={`role-badge-large ${selectedUser.role.replace(
                        "role_",
                        "role-"
                      )}`}
                    >
                      {selectedUser.role === "role_admin" ? "Admin" : "User"}
                    </span>
                  </div>

                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">ID người dùng</span>
                      <span className="detail-value">
                        {selectedUser.user_id}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tên đăng nhập</span>
                      <span className="detail-value">
                        {selectedUser.username}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Họ tên đầy đủ</span>
                      <span
                        className={`detail-value ${
                          !selectedUser.full_name ? "empty" : ""
                        }`}
                      >
                        {selectedUser.full_name || "Chưa cập nhật"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Giới tính</span>
                      <span
                        className={`detail-value ${
                          !selectedUser.gender ? "empty" : ""
                        }`}
                      >
                        {selectedUser.gender || "Chưa cập nhật"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ngày sinh</span>
                      <span
                        className={`detail-value ${
                          !selectedUser.birth_date ? "empty" : ""
                        }`}
                      >
                        {selectedUser.birth_date
                          ? formatDate(selectedUser.birth_date)
                          : "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="user-detail-section">
                  <div className="section-title">📞 Thông tin liên hệ</div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{selectedUser.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Số điện thoại</span>
                      <span
                        className={`detail-value ${
                          !selectedUser.phone ? "empty" : ""
                        }`}
                      >
                        {selectedUser.phone || "Chưa cập nhật"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Avatar URL</span>
                      <span
                        className={`detail-value ${
                          !selectedUser.avatar_url ? "empty" : ""
                        }`}
                      >
                        {selectedUser.avatar_url || "Chưa có avatar"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wallet Info */}
                <div className="user-detail-section">
                  <div className="section-title">💰 Thông tin ví</div>
                  <div style={{ textAlign: "center" }}>
                    <div className="wallet-balance-large">
                      {selectedUser.wallet_balance.toLocaleString("vi-VN")}
                    </div>
                    <p style={{ color: "#78909c", margin: "8px 0 0 0" }}>
                      Số dư hiện tại
                    </p>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="user-detail-section">
                  <div className="section-title">📅 Thời gian</div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày tạo tài khoản</span>
                      <span className="detail-value">
                        {formatDate(selectedUser.created_at)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Lần cập nhật cuối</span>
                      <span className="detail-value">
                        {formatDate(selectedUser.updated_at)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Trạng thái</span>
                      <span
                        className={`detail-value ${
                          selectedUser.deleted_at ? "empty" : ""
                        }`}
                      >
                        {selectedUser.deleted_at
                          ? `Đã xóa: ${formatDate(selectedUser.deleted_at)}`
                          : "Đang hoạt động"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="users-error">
                Không thể tải thông tin người dùng
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
