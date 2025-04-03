export const bookAppointment = async (data) => {
    const response = await fetch("/api/book", { method: "POST", body: JSON.stringify(data) });
    return response.json();
  };
  
  export const getPatientDetails = async (id) => {
    const response = await fetch(`/api/patient/${id}`);
    return response.json();
  };
  
  export const getProfile = async () => {
    const response = await fetch("/api/profile");
    return response.json();
  };
  
  export const updateProfile = async (data) => {
    await fetch("/api/profile", { method: "PUT", body: JSON.stringify(data) });
  };
  