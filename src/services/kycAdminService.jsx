// services/kycAdminService.jsx
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchPendingKYC = async () => {
  const response = await fetch(`${apiBaseURL}/admin/kyc`);

  if (!response.ok) {
    throw new Error(`Error fetching KYC data: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Received non-JSON response");
  }

  const data = await response.json();
  console.log(data);
  return data;
};

  
  export const approveKYC = async (userId) => {
    const response = await fetch(`${apiBaseURL}/admin/kyc/${userId}/approve`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  };
  
  export const rejectKYC = async (userId) => {
    const response = await fetch(`${apiBaseURL}/admin/kyc/${userId}/reject`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  };
  