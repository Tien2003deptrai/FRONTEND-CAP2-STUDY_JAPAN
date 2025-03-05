// config api product
import axios from 'axios';

const apiProduct = axios.create({
  baseURL: 'https://api.example.com/product',
});

export default apiProduct;