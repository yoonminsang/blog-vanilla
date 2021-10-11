import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;

async function request(method, url, body, multipart) {
  const headerOption = multipart && { 'Content-Type': 'multipart/form-data' };
  try {
    const accessToken = window.localStorage.getItem('user') || '';
    const res = await client({
      method,
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...headerOption,
      },
      ...(body && { data: body }),
    });

    if (res.data.requestAgain) {
      const { newAccessToken } = res.data;
      if (newAccessToken) {
        window.localStorage.setItem('user', newAccessToken);
      }

      const newResult = await request(method, url, body, multipart);
      return newResult;
    }

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    throw err;
  }
}

export default request;
