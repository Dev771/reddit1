import { AUTH } from '../constants/index';
import * as api from '../api/index';

export const signIn = (formData, navigate) => async (dispatch)=> {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate("/");
    } catch (error) {
        navigate('/auth/SignIn', { state: { message: error.response.data.message } });
        console.log(error.response.data);
    } 
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate("/");
    } catch (error) {
        console.log(error.message);
    }
}