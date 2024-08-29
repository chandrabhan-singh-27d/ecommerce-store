export const customFetch = async (...args) => {
    const response = await fetch(...args);

    if (response.status === 401 || response.status === 403) {
        localStorage.clear(); 
        window.location.href = '/login'; 
    }

    return response;
};
