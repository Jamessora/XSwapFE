//SignupService


const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const isAuthenticated = () => {
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  console.log("Authentication status:", isAuthenticated);
  return isAuthenticated;
};



export const signupService = async (email, password) => {
    const response = await fetch(`${apiBaseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          password_confirmation: password,
        },
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
    return response.json();
  };


  //LoginService


  export const loginService = async (email, password) => {
    const response = await fetch(`${apiBaseURL}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    
    console.log(response.headers);
    const data = await response.json();
  
   
  if (!response.ok) {
    throw new Error(data.error); // Assuming the server sends the error message under the "error" key
  }
  
  const token = response.headers.get('Authorization').split(' ')[1];
  localStorage.setItem('auth_token', token);
  localStorage.setItem('role', 'user');
  console.log(token);
  

  return data;
  };
  
  export const logout = () => {
    localStorage.removeItem('auth_token');
    
  };