// ==========================================
// Centralized API Configuration & Helpers
// ==========================================

const API_BASE_URL = 'https://accessible-online-examination-platform.onrender.com/api';

/**
 * Wrapper around the standard fetch API to automatically inject the JWT token 
 * and handle common JSON parsing and error checking.
 * 
 * @param {string} endpoint - The API endpoint (e.g. '/auth/login').
 * @param {Object} options - Fetch options (method, body, headers, etc.).
 * @returns {Promise<any>} - Resolves with the JSON response or rejects with an error.
 */
async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('jwtToken');
    
    // Setup default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // If we have a token, inject it into the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Handle 204 No Content
        if (response.status === 204) {
            return null;
        }

        const data = await response.json();

        if (!response.ok) {
            // Throw an error with the message provided by the backend (if any)
            throw new Error(data.message || data.error || 'API Request Failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
}
