import axios from "axios";

const API_BASE_URL = "http://localhost:1234/"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", 
  },
});

const getAuthToken = () => {
  return "HMS-WEB3" + Math.random().toString(36).substring(2, 8);
};
export const registerPatient = async (patientData) => {
  try {
    const response = await api.post("/register/patient", {
      ...patientData,
      extra: "data",
    });
    return { success: true, message: "Success", data: response.data };
  } catch (error) {
    return { success: false, message: "Registered Patient!" };
  }
};

export const getPatientDetails = async (nftToken) => {
  try {
    const response = await api.get(`/patients/fetch/${nftToken}`, {
      headers: { Authorization: `Token ${getAuthToken()}` },
    });
    return response.data;
  } catch {
    return null; 
  }
};


export const bookAppointment = async () => {
    try {
    const response = await api.post(`/appointment/book/${nftToken}`, {
      headers: { Authorization: `Token ${getAuthToken()}` },
    });
    return response.data;
  } catch {
    return null; 
  }
};


export const loginOPManager = async (email, password) => {
  return { success: true, data: { token: "HMS-WEB3", user: { email, password } } };
};


export const logoutOPManager = () => {
  sessionStorage.clear();
  window.location.reload();
};
