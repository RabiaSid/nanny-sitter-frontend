// import axios from "axios";

// export const apiHandle = axios.create({
//     baseURL: "http://localhost:5000/",
//     headers: {
//         Authorization: `Bearer `,
//     },
// });

// export const Get = (endPoint, id) => {
//     return apiHandle.get(`${endPoint}/${id ? id : ""}`);
// };
// export const Delete = (endPoint, id) => {
//     return apiHandle.delete(`${endPoint}/${id ? id : ""}`);
// };
// export const Put = (endPoint, id) => {
//     return apiHandle.put(`${endPoint}/`);
// };
// // export const Post = (endPoint, id) => {
// //   return apiHandle.post(`${endPoint}`);
// // };

// export const Post = (endpoint, stateName, id) => {
//     return apiHandle.post(`${endpoint}/${id ? id : ""}`, stateName);
// };

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseApi = 'http://localhost:5000/';

const api = axios.create({
  baseURL: baseApi,
});

// Function to set the authorization token in headers
const setAuthToken = async () => {
  const token = await AsyncStorage.getItem('bussAppToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};



const Get = (apiName, id) => {
    return api.get(`${apiName}/${id ? id : ""}`);
};

// GET Request
// const Get = async (apiName, id, params) => {
//   await setAuthToken(); // Ensure token is set
//   try {
//     const res = await api.get(`${apiName}${id ? '/' + id : ''}`, { params });
//     if (res.data.isSuccessfull) {
//       return res.data;
//     } else {
//       throw new Error(res.data.message || 'Request failed');
//     }
//   } catch (err) {
//     throw err; // Propagate error
//   }
// };

// POST Request
const Post = async (apiName, body) => {
  await setAuthToken(); // Ensure token is set
  try {
    const res = await api.post(apiName, body);
    return res.data;
  } catch (err) {
    throw err; // Propagate error
  }
};

// PUT Request
const Put = async (apiName, body, id) => {
  await setAuthToken(); // Ensure token is set
  try {
    return await api.put(`${apiName}/${id}`, body);
  } catch (err) {
    throw err; // Propagate error
  }
};

// DELETE Request
const Delete = async (apiName, id) => {
  await setAuthToken(); // Ensure token is set
  try {
    return await api.delete(`${apiName}/${id}`);
  } catch (err) {
    throw err; // Propagate error
  }
};

// User-specific GET Request (for additional body handling)
const userGet = async (apiName, body) => {
  try {
    const res = await api.post(apiName, body);
    return res.data;
  } catch (err) {
    throw err; // Propagate error
  }
};

export { Get, userGet, Post, Delete, Put };
