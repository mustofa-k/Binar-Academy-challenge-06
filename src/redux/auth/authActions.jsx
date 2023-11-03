
import { login } from './authSlice';
import axios from 'axios';



export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}/api/v1/auth/register`,
     
      userData
    );

    const { token, user } = response.data.data;

    if (token) {
      localStorage.setItem('token', token);
      dispatch(login({ token, user }));
      return { token, user };
    } else {
      throw new Error('Token not received');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = (email, password, accessToken = null) => async (dispatch) => {
 
  try {
    let response;
    if (accessToken) {
      response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/google`,
        { access_token: accessToken } 
      );
    } else {
      response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/login`,
        
        {
          email,
          password,
        }
      );
    }

    const { token, user } = response.data.data;

    if (token) {
      localStorage.setItem('token', token);
      dispatch(login({ token, user }));
      return { token, user };
    } else {
      throw new Error('Token not received');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
