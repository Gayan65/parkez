//sweet alerts
import Swal from "sweetalert2";

let logoutFunction = null;
let logoutTriggered = false; // Flag to track if logout has already been executed

// Function to set the logout function from useLogout
export const setLogout = (logout) => {
    logoutFunction = logout;
};

// Custom fetch wrapper
export const fetchWrapper = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
        },
    });

    // Check for 401 Unauthorized response
    if (response.status === 401) {
        //logout action
        // Call the logout function if provided
        if (!logoutTriggered && logoutFunction) {
            logoutTriggered = true; // Set flag
            // Show SweetAlert and wait for user confirmation
            await Swal.fire({
                title: "Session Expired",
                text: "Your session has expired. Please log in again.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            logoutFunction();
            window.location.href = "/login";
            return; // Stop further execution
        }
    }

    return response;
};
