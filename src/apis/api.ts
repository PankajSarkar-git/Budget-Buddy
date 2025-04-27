import createApiInstance from "./createApiInstance";

export const myApi = "https://quagga-driving-socially.ngrok-free.app";

const api = createApiInstance(myApi, "budet_buddy");

export default api.instance;