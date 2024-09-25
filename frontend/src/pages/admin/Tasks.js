import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

//components
import PendingRequest from "../../components/PendingRequest";
import PendingUnassignRequest from "../../components/PendingUnassignRequest";

const Tasks = () => {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("assign");

    return (
        <div className="container">
            {/* Nav tabs */}
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${
                            activeTab === "assign" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("assign")}
                        role="tab"
                        type="button"
                    >
                        Parking Assign Requests
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${
                            activeTab === "unassign" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("unassign")}
                        role="tab"
                        type="button"
                    >
                        Parking Unassign Requests
                    </button>
                </li>
            </ul>

            {/* Conditionally render the appropriate component */}
            <div className="tab-content mt-3">
                {activeTab === "assign" && user && user.admin && (
                    <PendingRequest />
                )}
                {activeTab === "unassign" && user && user.admin && (
                    <PendingUnassignRequest />
                )}
            </div>
        </div>
    );
};

export default Tasks;
