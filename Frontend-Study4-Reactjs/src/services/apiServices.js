import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('image', image);

    return axios.post('api/user', data); // da lay duong link local ben file instance
};

const putUpdateUser = (id, email, password, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('image', image);

    return axios.put('api/user', data); // da lay duong link local ben file instance
};

const getAllUsers = () => {
    return axios.get('api/user');
};

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
};

const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPass) => {
    return axios.post(`/api/v1/login`, {
        email: userEmail,
        password: userPass,
        delay: 5000,
    });
};

const postRegister = (email, password, username) => {
    return axios.post(`/api/v1/register`, { email, password, username });
};

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data); // da lay duong link local ben file instance
};

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`);
};

const getAllListVoc = () => {
    return axios.get(`/api/get-all-list-voc`);
};

const handleGetAListWord = async (id) => {
    let res = await axios.get(`/api/get-a-list-voc?list_id=${id}`);

    return res.data;
};

const handleGetListAnswer = (id) => {
    return axios.get(`/api/get-list-practice/answer-voc?vocabulary_id=${id}`);
};

const handleGetAllLesson = (id_unit) => {
    return axios.get(`/api/get-all-lesson?unit_id=${id_unit}`);
};

const handleChangeStatusStudy = (id) => {
    return axios.put(`/api/change-status-lesson?lesson_id=${id}`);
};

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email,
        refresh_token,
    });
};

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    getAllListVoc,
    handleGetAListWord,
    handleGetListAnswer,
    handleGetAllLesson,
    handleChangeStatusStudy,
    logout,
};
