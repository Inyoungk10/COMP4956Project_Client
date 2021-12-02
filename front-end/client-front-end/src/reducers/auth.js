/**
 * @Author Cameron Wark
*/

// reducer used for authentication.
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            // put the user data in localstorage to be used throughout the application.
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case 'LOGOUT':
            // clear the user data in localstorage in the case of logout.
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;
