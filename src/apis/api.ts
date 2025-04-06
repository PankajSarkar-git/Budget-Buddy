import createApiInstance from "./createApiInstance";

export const myApi = "https://fakestoreapi.com";

const api = createApiInstance(myApi, "fakestoreapi");

export default api.instance;