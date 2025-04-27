import api from '../api';
import authApiEndpoint from './config';

const authApi = {
  async postLogin(payload: any) {
    const res = await api.post(authApiEndpoint.login, payload);
    return res;
  },
  async postSignUp(payload: any) {
    const res = await api.post(authApiEndpoint.register, payload);
    return res;
  },
};

export default authApi;
