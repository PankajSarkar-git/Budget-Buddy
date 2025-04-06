import api from "../api";
import getProductEndPoint from "./config";

const getProductApi = {
  async getProduct() {
    const res = await api.get(getProductEndPoint.getProduct);
    return res;
  },
};

export default getProductApi;
