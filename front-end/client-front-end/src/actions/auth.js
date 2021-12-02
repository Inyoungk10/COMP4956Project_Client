/**
 * Author: Cameron Wark
*/
import * as api from '../api/index.js';

// action that is called when user tries to sign in manually.
export const signin = (formData, history) => async (dispatch) => {
    try {
        // give object with user credentials to backend /signIn endpoint, then put response in variable to pass to reducer.
        const { data } = await api.signIn(formData);
        // dispatch auth.js reducer to put user data in localstorage.
        dispatch({ type: 'AUTH', data });
        // redirect user to the homepage
        history.push('/rooms');
    } catch (error) {
        console.log(error);
    }
}

// action that is called when user tries to sign up manually.
export const signup = (formData, history) => async (dispatch) => {
    try {
        // give object with user credentials to backend /signUp endpoint, then put response in variable to pass to reducer.
        const { data } = await api.signUp(formData);
        // dispatch auth.js reducer to put user data in localstorage.
        dispatch({ type: 'AUTH', data });
        // homepage redirect
        history.push('/rooms');
    } catch (error) {
        console.log(error);
    }
}
