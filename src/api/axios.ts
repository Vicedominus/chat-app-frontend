import axios from 'axios';

// Base URL points to the local Django server
const BASE_URL = 'http://localhost:8000';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
