import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const getPost = () => API.get('/posts');
export const createPost = (NewPost) => API.post('/posts', NewPost);
export const likePost = (id, state) => API.patch(`/posts/${id}/${state}`);

export const getTag = () => API.get('/tag');
export const createTags = (NewTag) => API.post('/tag', NewTag);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);