import request from './request';

export const createPostApi = ({ title, content }) => request('POST', '/api/post', { title, content });

export const readPostApi = ({ id }) => request('GET', `/api/post/${id}`);

export const readPostListApi = ({ lastId }) => request('GET', `/api/post?lastId=${lastId}`);

export const updatePostApi = ({ id, title, content }) => request('PUT', `/api/auth/${id}`, { title, content });

export const deletePostApi = () => request('GET', '/api/auth');
