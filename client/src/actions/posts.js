import * as api from '../api/index';
import { CREATE_POST, FETCH_ALL, LIKE_POST } from '../constants/index';

export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.getPost();

        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.response.data);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        
        dispatch({ type: CREATE_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id, state) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id, state);

        dispatch({type: LIKE_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}