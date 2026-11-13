import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

export default instance;