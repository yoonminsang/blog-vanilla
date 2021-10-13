import request from './request';

export const loginApi = ({ email, password }) => request('POST', '/api/auth/login', { email, password });

export const signupApi = ({ email, password }) => request('POST', '/api/auth/signup', { email, password });

export const logoutApi = () => request('DELETE', '/api/auth');

export const checkAuthApi = () => request('GET', '/api/auth');

// export const githubLogin = ({ code }) => request('POST', '/api/auth/github', { code });
