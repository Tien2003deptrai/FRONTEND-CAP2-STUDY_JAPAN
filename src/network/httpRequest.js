import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWM3MmVmNWY1YjJjMWQ0YzhlMTAwMSIsImVtYWlsIjoibmd1eWVuLmFuQGV4YW1wbGUuY29tIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTc0MjUyOTYwMiwiZXhwIjoxNzQzMTM0NDAyfQ.CnSwxCuCvoSyHQALlKZ411NjiLbWdWMgDsEJlpgJVh8',
  },
  withCredentials: true,
})

export default axiosInstance
