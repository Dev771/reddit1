import  * as api from '../api/index';
import { CREATE_TAG, FETCH_ALL_TAGS } from '../constants/index';

export const getTags = () => async (dispatch) => {
    try {
        const { data } = await api.getTag();

        dispatch({ type: FETCH_ALL_TAGS, payload: data });
    } catch(error) {
        console.log(error);
    }
}

export const createTag = (tag) => async (dispatch) => {
    try {
        const { data } = await api.createTags(tag);
    
        dispatch({type: CREATE_TAG, payload: data});
    } catch (error) {
        console.log(error);
    }
}