import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : `http://${window.location.hostname}:3000`;
client.defaults.withCredentials = true;

const requestEvent = new CustomEvent('request');
const requestEndEvent = new CustomEvent('request-end');

async function request(method, url, body, multipart) {
  window.dispatchEvent(requestEvent);
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

    if (res.data.expiredRefreshToken) {
      // eslint-disable-next-line no-alert
      alert('토큰 기간이 만료되었습니다. 다시 로그인 해주세요');
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
  } finally {
    window.dispatchEvent(requestEndEvent);
  }
}

export default request;
