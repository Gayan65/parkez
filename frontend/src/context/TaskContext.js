import { createContext, useReducer } from "react";

export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "SET_NUMBER_OF_TOTAL_TASKS":
            return { totalTasks: action.payload };

        case "CREATE_NUMBER_OF_TOTAL_TASKS":
            return { totalTasks: action.payload };

        //delete parks
        //modify parks
        default:
            return state;
    }
};

export const TasksContextProvider = ({ children }) => {
    const [state, task_dispatch] = useReducer(tasksReducer, {
        totalTasks: null, // this added for bug fixing iterable error
    });

    return (
        <TasksContext.Provider value={{ ...state, task_dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};
