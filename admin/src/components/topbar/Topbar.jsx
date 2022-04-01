import React from "react";
import "./topbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { persistor } from "../../redux/store";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const handleClick = () => {
    persistor.purge();
    window.location.reload(false);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Grapsy Admin Panel</span>
        </div>
        <div className="topRight">
          {user ? (
            <div className="tp">
              <h3 style={{ fontWeight: "normal" }}>{user.username}</h3>
              <Link to="/website">
                <DashboardIcon
                  style={{
                    marginTop: "2px",
                    color: "#4889c2",
                    marginLeft: "10px",
                  }}
                />
              </Link>
              <button onClick={handleClick}>
                <LogoutIcon style={{ marginTop: "2px" }} />
              </button>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </div>
      </div>
    </div>
  );
}
