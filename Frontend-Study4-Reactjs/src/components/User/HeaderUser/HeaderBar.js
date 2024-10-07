import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../../assets/study4_logo.png';
import imgAccount from '../../../assets/kieu1.jpg';
const HeaderBar = (props) => {
    return (
        <>
            <div className="left-header">
                <div className="logo-header p-2">
                    <img src={logo} />
                </div>
            </div>
            <div className="right-header">
                <div className="nav-header">
                    <div className="li-1">Khoá học của tôi</div>
                    <div className="li-1">Chương trình học</div>
                    <div className="li-1">Đề thi online</div>
                    <div className="li-1">Flashcards</div>
                    <div className="li-1">Blog</div>
                    <div className="li-1">Kích hoạt tài khoản</div>
                    <div className="li-1">
                        <a className="nav-link dropdown-toggle user-topnav-profile" href="/my-account/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="account-profile-img">
                                <img src="https://res.cloudinary.com/sandodep8/image/upload/w_300/sandodep8_x_136222279583670440204288678618639215437_cay3hh" alt="tedvkieu"/>
                                
                            </span>
                            
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderBar;
