const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
export const submitKYC = async (kycData) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    const response = await fetch(`${apiBaseURL}/api/kyc`, {
 
        method: 'POST',
        headers,
        body: JSON.stringify(kycData),
      });
  
    if (!response.ok) {
        throw new Error('Failed to submit KYC data');
      }
      
      return await response.json();
    };
  

    export const fetchKYCStatus = async () => {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
    
      const response = await fetch(`${apiBaseURL}/users/sessions/kyc_status`, {
        method: 'GET',
        headers,
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch KYC status');
      }
    
      const data = await response.json();
      return data.kyc_status;
    };
    
    