import request from './request';

export const createCommentApi = ({ content, postId }) => request('POST', '/api/comment', { content, postId });

export const readCommentApi = ({ id }) => request('GET', `/api/comment/${id}`);

export const readCommentListApi = ({ postId, pageId }) =>
  request('GET', `/api/comment/postId=${postId}&pageId=${pageId}`);

export const updateCommentApi = ({ postId, content }) => request('PUT', `/api/post/${postId}`, { content });

export const deletePostApi = ({ id }) => request('DELETE', `/api/comment/${id}`);
