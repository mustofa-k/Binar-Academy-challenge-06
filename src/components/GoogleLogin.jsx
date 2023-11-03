
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/auth/authActions';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google'; // Import useGoogleLogin

// eslint-disable-next-line react/prop-types
function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginWithGoogle = useGoogleLogin({ // Definisikan useGoogleLogin di sini
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await dispatch(loginUser('', '', accessToken));

      if (response.token) {
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <Button variant="primary" onClick={() => loginWithGoogle()}>
      {buttonText}
    </Button>
  );
}

export default GoogleLogin;
