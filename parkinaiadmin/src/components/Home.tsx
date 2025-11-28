import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminUser from "./AdminUser";
import AdminParkinOrder from "./AdminParkinOrder";
import AdminServiceOrder from "./AdminServiceOrder";
import AdminParkinLot from "./AdminParkinLot";
import AdminDashboard from "./AdminDashboard";
import AdminParkingLotReview from "./AdminParkingLotReview";
import AdminPayment from "./AdminPayment";
import "../css/home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUsername(user.username || "");
        setRole(user.role || "");
        
        // Default to parkinOrder for USER and role_mentor
        if (user.role === "USER") {
          setSelectedMenu("parkinOrder");
        }
        // If role is role_mentor, automatically show payment
        else if (user.role === "role_mentor") {
          setSelectedMenu("payment");
        }
      } catch {
        setUsername("");
        setRole("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-wrapper">
      {/* Sidebar */}
      <div className="home-sidebar">
        <h3 className="home-sidebar-title">Quản lý Admin</h3>
        {role === "role_mentor" ? (
          <button
            className={`home-sidebar-btn${
              selectedMenu === "payment" ? " selected" : ""
            }`}
            onClick={() => setSelectedMenu("payment")}
          >
            Payment
          </button>
        ) : (
          <>
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "dashboard" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("dashboard")}
              >
                Dashboard
              </button>
            )}
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "user" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("user")}
              >
                User
              </button>
            )}
            <button
              className={`home-sidebar-btn${
                selectedMenu === "parkinOrder" ? " selected" : ""
              }`}
              onClick={() => setSelectedMenu("parkinOrder")}
            >
              Parkin Order
            </button>
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "serviceOrder" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("serviceOrder")}
              >
                Service Order
              </button>
            )}
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "parkinLot" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("parkinLot")}
              >
                Parkin Lot
              </button>
            )}
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "review" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("review")}
              >
                Review
              </button>
            )}
            {role !== "USER" && (
              <button
                className={`home-sidebar-btn${
                  selectedMenu === "payment" ? " selected" : ""
                }`}
                onClick={() => setSelectedMenu("payment")}
              >
                Payment
              </button>
            )}
          </>
        )}
        {username && (
          <button
            onClick={handleLogout}
            className="home-logout-btn"
          >
            Đăng xuất
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="home-main">
        {role !== "USER" && role !== "role_mentor" && selectedMenu === "dashboard" && <AdminDashboard />}
        {role !== "USER" && role !== "role_mentor" && selectedMenu === "user" && <AdminUser />}
        {selectedMenu === "parkinOrder" && <AdminParkinOrder userRole={role} />}
        {(selectedMenu === "serviceOrder" && (role === "role_mentor" || (role !== "USER" && role !== "role_mentor"))) && <AdminServiceOrder userRole={role} />}
        {role !== "USER" && role !== "role_mentor" && selectedMenu === "parkinLot" && <AdminParkinLot />}
        {role !== "USER" && role !== "role_mentor" && selectedMenu === "review" && <AdminParkingLotReview />}
        {(selectedMenu === "payment" && (role === "role_mentor" || (role !== "USER" && role !== "role_mentor"))) && <AdminPayment />}
      </div>
    </div>
  );
};

export default Home;
