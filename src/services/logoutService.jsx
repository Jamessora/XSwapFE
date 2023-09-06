//LogoutService

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const logoutService = async () => {
    try{
    const response = await fetch(`${apiBaseURL}/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
        
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    
    console.log('Logout successful');
    return responseData;
    } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};


  


  
  
  
  