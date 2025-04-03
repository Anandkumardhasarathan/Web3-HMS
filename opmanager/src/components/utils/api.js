import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend API Base URL

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get token from localStorage
const getAuthToken = () => sessionStorage.getItem("authToken");

// Register Patient API Call
export const registerPatient = async (patientData) => {
  try {
    const response = await api.post("/patients/register", patientData, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return { success: true, message: "Patient Registered Successfully!", data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to Register Patient!" };
  }
};

// Get Patient Details API
export const getPatientDetails = async (nftToken) => {
  try {
    const response = await api.get(`/patient-fetch/patient/${nftToken}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error Fetching Patient Data:", error.response?.data?.message || error.message);
    return null;
  }
};

// ✅ Updated Book Appointment API (Includes Token)
export const bookAppointment = async (appointmentData) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Authentication token not found!");

    const response = await api.post("/op-managers/book-appointment", appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error booking appointment:", error.response?.data?.message || error.message);

    // ✅ Handle Unauthorized (401) Errors
    if (error.response?.status === 401) {
      sessionStorage.removeItem("authToken"); // Clear token on unauthorized access
      window.location.href = "/"; // Redirect to login
    }
    throw error;
  }
};


export const loginOPManager = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/op-managers/login`, { email, password });

    // ✅ Store token in sessionStorage (Temporary until logout)
    sessionStorage.setItem("authToken", response.data.token);
    sessionStorage.setItem("opManager", JSON.stringify(response.data.user));

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed!" };
  }
};


export const logoutOPManager = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("opManager");
  window.location.href = "/"; // Redirect to login page
};