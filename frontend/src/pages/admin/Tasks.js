import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

//components
import PendingRequest from "../../components/PendingRequest";
import PendingUnassignRequest from "../../components/PendingUnassignRequest";

const Tasks = () => {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("assign");

    const [notifications, setNotifications] = useState(0);
    const [unassignNotifications, setUnassignNotifications] = useState(0);

    const handleTotalNotifications = (totalNotifications) => {
        setNotifications(totalNotifications);
    };

    const handleUnassignTotalNotifications = (totalUnassignNotifications) => {
        setUnassignNotifications(totalUnassignNotifications);
    };

    return (
        <div className="container mt-4">
            {/* Nav tabs */}
            <ul className="nav nav-tabs nav-custom" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link nav-custom position-relative ${
                            activeTab === "assign" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("assign")}
                        role="tab"
                        type="button"
                    >
                        Parking Assign Requests
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {notifications}
                        </span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link nav-custom  position-relative ${
                            activeTab === "unassign" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("unassign")}
                        role="tab"
                        type="button"
                    >
                        Parking Unassign Requests
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unassignNotifications}
                        </span>
                    </button>
                </li>
            </ul>

            {/* Conditionally render the appropriate component */}
            <div className="tab-content mt-3">
                {activeTab === "assign" && user && user.admin && (
                    <PendingRequest
                        totalNotifications={handleTotalNotifications}
                    />
                )}
                {activeTab === "unassign" && user && user.admin && (
                    <PendingUnassignRequest
                        totalNotifications={handleUnassignTotalNotifications}
                    />
                )}
            </div>
        </div>
    );
};

export default Tasks;
