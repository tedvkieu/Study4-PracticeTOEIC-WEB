import {  Routes, Route,  } from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import App from './App';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import VocabularyList from './components/User/Vocabulary/VocabularyList';
import CompleteToeic from './components/User/MainCourse/CompleteToeic';
import ManageLessonVocabulary from './components/User/Vocabulary/ManageLessonVocabulary';

import PrivateRoute from './routes/PrivateRoute';

const NotFound = () => {
    return (
        <div className="container  mt-3 alert alert-danger">
            404 . Not found data with your current URL
        </div>
    );
};

const Layout = (props) => {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="users" element={<ListQuiz />}></Route>
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requiredRole="ADMIN">
                            <Admin />
                        </PrivateRoute>
                    }>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route
                    path="/complete-toeic"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }>
                    <Route path="learn" element={<CompleteToeic />} />
                    <Route
                        path="vocabulary"
                        element={<VocabularyList />}></Route>
                    <Route
                        path="vocabulary/list/:list_id/lesson/:lesson_id"
                        element={<ManageLessonVocabulary />}
                    />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Layout;
