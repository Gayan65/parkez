import { createContext, useReducer } from "react";

export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "SET_NUMBER_OF_TOTAL_TASKS":
            return {
                totalTasks: action.payload.totalTasks,
                pendingTasks: action.payload.pendingTasks,
                pendingUnassignTasks: action.payload.pendingUnassignTasks,
            };

        case "CREATE_NUMBER_OF_TOTAL_TASKS":
            return {
                totalTasks: action.payload.totalTasks,
                pendingTasks: action.payload.pendingTasks,
                pendingUnassignTasks: action.payload.pendingUnassignTasks,
            };

        default:
            return state;
    }
};

export const TasksContextProvider = ({ children }) => {
    const [state, task_dispatch] = useReducer(tasksReducer, {
        totalTasks: null,
        pendingTasks: null,
        pendingUnassignTasks: null,
    });

    return (
        <TasksContext.Provider value={{ ...state, task_dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};
