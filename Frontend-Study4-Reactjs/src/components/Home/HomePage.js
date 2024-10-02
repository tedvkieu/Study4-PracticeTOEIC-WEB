import videoHomePage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">There's a better way to ask</div>
                <div className="title-2">
                    Get more data - like signups, feedback, and anything else -
                    with forms designed to be refreshingly differen
                </div>

                <div className="title-3">
                    {isAuthenticated === false ? (
                        <button onClick={() => navigate('/login')}>
                            Get started. It's free
                        </button>
                    ) : (
                        <button onClick={() => navigate('/users')}>
                            Doing Quiz Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
