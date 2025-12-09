
import axios from "axios";

// Create an axios instance
const baseApi = axios.create({
  baseURL:"http://10.10.7.85:8001", 
});


// // Interceptor to add the Authorization header before each request
baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default baseApi;





// import axios from "axios";

// // Create an axios instance
// const baseApi = axios.create({
//   baseURL: "http://10.10.7.19:8000", // Your API base URL
// });

// // Interceptor to add the Authorization header before each request
// baseApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle token expiration and refresh the token
// baseApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401 && error.response?.data?.code === 'token_not_valid') {
//       const refreshToken = localStorage.getItem('refresh_token');

//       // If no refresh token exists, redirect to login
//       if (!refreshToken) {
//         window.location.href = '/login';  // Redirect to login if no refresh token
//         return Promise.reject(error);
//       }

//       try {
//         // Attempt to refresh the access token using the refresh token
//         const refreshResponse = await axios.post('http://10.10.7.19:8000/api/refresh-token/', {
//           refresh_token: refreshToken,
//         });

//         // Extract new tokens from the response
//         const { access_token, refresh_token } = refreshResponse.data;

//         // Store the new tokens in localStorage
//         localStorage.setItem('access_token', access_token); 
//         localStorage.setItem('refresh_token', refresh_token);

//         // Retry the failed request with the new access token
//         error.config.headers['Authorization'] = `Bearer ${access_token}`;
//         return axios(error.config);
//       } catch (refreshError) {
//         // In case refresh fails, redirect to login
//         window.location.href = '/login';  // Redirect to login if token refresh fails
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default baseApi;
