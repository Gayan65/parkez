import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

export const useTaskContext = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw Error(
            "useTaskContext must be used inside a TasksContextProvider"
        );
    }

    return context;
};
