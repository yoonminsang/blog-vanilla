import request from './request';

export const login = ({ id, password }) => request('POST', '/api/auth', { id, password });

export const signup = ({ id, password }) => request('POST', '/api/users', { id, password });

export const logout = () => request('DELETE', '/api/auth');

export const checkAuth = () => request('GET', '/api/auth');

// export const githubLogin = ({ code }) => request('POST', '/api/auth/github', { code });
