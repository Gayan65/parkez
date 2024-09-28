import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTaskContext } from "../../hooks/useTaskContext";

//components
import PendingRequest from "../../components/PendingRequest";
import PendingUnassignRequest from "../../components/PendingUnassignRequest";

const Tasks = () => {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState("assign");

    //task count context
    const { pendingTasks, pendingUnassignTasks, task_dispatch } =
        useTaskContext();

    useEffect(() => {
        //fetch number of tasks
        const numberOfTasks = async () => {
            const response = await fetch("/api/tasks");
            const json = await response.json();

            if (response.ok) {
                task_dispatch({
                    type: "SET_NUMBER_OF_TOTAL_TASKS",
                    payload: {
                        totalTasks: json.totalTasks,
                        pendingTasks: json.pendingTasks,
                        pendingUnassignTasks: json.pendingUnassignTasks,
                    },
                });
            }
        };
        numberOfTasks();
    }, [task_dispatch]);

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
                            {pendingTasks}
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
                            {pendingUnassignTasks}
                        </span>
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
