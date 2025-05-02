import api from '../api';
import userApiEndpoint from './config';

const userApi = {
  async getUserDetails() {
    const res = await api.get(userApiEndpoint.userDetails);
    return res;
  },
};

export default userApi;
