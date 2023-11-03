import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import movieReducer from './MovieList/movieSlice';
import thunk from 'redux-thunk'; 
 

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
  middleware: [thunk], 
});

export default store;
