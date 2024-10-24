import { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner } from 'react-icons/im';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);

    const role = useSelector((state) => state.user.account.role);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (role) {
            console.log('check role: ', role);
            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/complete-toeic/learn');
            }
        }
    }, [role, navigate]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        // Validation
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        setIsLoadingData(true);

        // Submit
        let data = await postLogin(email, password);
        console.log('data: ', data);

        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoadingData(false);

            console.log('check role: ', role);

            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/complete-toeic/learn');
            }
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoadingData(false);
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="header">
                    <span>Don't have an account yet?</span>
                    <button onClick={() => navigate('/register')}>
                        Sign up
                    </button>
                </div>

                <div className="title col-4 mx-auto">Tedvkieu</div>
                <div className="welcome col-4 mx-auto">Hello, Who's this?</div>
                <div className="content-form col-4 mx-auto">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                    </div>
                    <span className="forgot-password">Forgot password?</span>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => handleLogin()}
                            disabled={isLoadingData}>
                            {isLoadingData === true && (
                                <ImSpinner className="loaderIcon" />
                            )}
                            <span>Login to Tedvkieu</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <span
                            className="back"
                            onClick={() => {
                                navigate('/');
                            }}>
                            &#60; &#60; Go to home Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
