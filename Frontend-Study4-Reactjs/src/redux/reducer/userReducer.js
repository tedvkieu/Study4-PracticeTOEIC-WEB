import { DECREMENT } from '../action/counterAction';
import {
    FETCH_USER_LOGIN_SUCCESS,
    SET_LIST_VOC,
    SET_LIST_LESSON,
    USER_LOGOUT_SUCCESS,
} from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false,
    listVoc: [],
    listLesson: [],
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log('check_action', action);
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    email: action?.payload?.DT?.email, // OK
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                },
                isAuthenticated: true,
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                },
                isAuthenticated: false,
            };
        case SET_LIST_VOC:
            return {
                ...state,
                listVoc: action.payload,
            };
        case SET_LIST_LESSON:
            return {
                ...state,
                listLesson: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
