export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

export const SET_LIST_VOC = 'SET_LIST_VOC';
export const SET_LIST_LESSON = 'SET_LIST_LESSON';

export const setListVoc = (listVoc) => ({
    type: SET_LIST_VOC,
    payload: listVoc,
});

export const setListLesson = (listLesson) => ({
    type: SET_LIST_LESSON,
    payload: listLesson,
});
export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data,
    };
};
