let logoutFunction = null;

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
        if (logoutFunction) {
            logoutFunction();
            window.location.href = "/login";
            return; // Stop further execution
        }
    }

    // If the response is not OK, throw an error
    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
};
