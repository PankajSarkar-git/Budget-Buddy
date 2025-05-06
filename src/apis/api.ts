import createApiInstance from './createApiInstance';

// export const myApi = "https://quagga-driving-socially.ngrok-free.app";
// export const myApi = 'http://13.126.145.147:8080';
export const myApi = 'https://budgetbuddy.webweavecreations.in';

const api = createApiInstance(myApi, 'budet_buddy');

export default api.instance;
