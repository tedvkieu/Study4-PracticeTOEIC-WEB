import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../../assets/study4_logo.png';
import imgAccount from '../../../assets/kieu1.jpg';
import { useState } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../../../redux/action/userAction';
import { logout } from '../../../services/apiServices';
import { toast } from 'react-toastify';
const HeaderBar = (props) => {
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [toggleUser, setToggleUser] = useState(false);

    const handleClose = () => setToggleUser(false);
    const handleClickProfile = () => setToggleUser(!toggleUser);

    const handelLogout = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    };

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
                        <Navbar expand="lg" className="bg-body-tertiary">
                            <Container fluid>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse
                                    id="navbarScroll"
                                    onClick={handleClickProfile}
                                    onMouseEnter={() => setToggleUser(true)}
                                    onMouseLeave={() => setToggleUser(false)}>
                                    <Nav
                                        className="me-auto my-2 my-lg-0"
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll>
                                        <a
                                            className="nav-link user-topnav-profile"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded={
                                                toggleUser ? 'true' : 'false'
                                            }>
                                            <span className="account-profile-img">
                                                <img
                                                    src="https://res.cloudinary.com/sandodep8/image/upload/w_300/sandodep8_x_136222279583670440204288678618639215437_cay3hh"
                                                    alt="tedvkieu"
                                                />
                                            </span>
                                        </a>
                                        <NavDropdown
                                            id="navbarScrollingDropdown"
                                            show={toggleUser}
                                            className="custom-navbar-menu">
                                            <NavDropdown.Item href="#action3">
                                                Profile
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                onClick={handelLogout}>
                                                Log out
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderBar;
