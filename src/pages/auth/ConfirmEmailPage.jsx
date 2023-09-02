import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const ConfirmEmailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('confirmation_token');

    if (!token) {
      console.error('Token not found');
      // Navigate to an error page or show an error message
      return;
    }

    // Make an API request to confirm the email
    fetch(`${apiBaseURL}/api/confirm-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Navigate to a success page
          navigate('/confirmation-success');
        } else {
          // Navigate to an error page or show an error message
          console.error(data.message);
          navigate('/confirmation-failed');
        }
      })
      .catch((error) => {
        console.error('Error confirming email:', error);
        // Navigate to an error page or show an error message
        navigate('/confirmation-failed');
      });
  }, [navigate]);

  return (
    <div>
      {/* You can show a loading spinner here while the confirmation is being processed */}
      Confirming your email...

      <Link href="/login" >
        Login to account
      </Link>
    </div>
  );
};

export default ConfirmEmailPage;
