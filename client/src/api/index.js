import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const getPost = () => API.get('/posts');
export const createPost = (NewPost) => API.post('/posts', NewPost);
export const likePost = (id) => API.post(`/posts/${id}`);

export const getTag = () => API.get('/tag');
export const createTags = (NewTag) => API.post('/tag', NewTag);