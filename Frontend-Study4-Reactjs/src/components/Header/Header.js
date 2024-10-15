import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';

const Header = () => {
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    Kieu is Here
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            Users
                        </NavLink>
                        <NavLink to="/admin" className="nav-link">
                            Admin
                        </NavLink>
                        {/* <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn-login"
                                    onClick={() => handleLogin()}>
                                    Login
                                </button>
                                <button
                                    className="btn-signup"
                                    onClick={() => handleRegister()}>
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown">
                                <NavDropdown.Item>Login</NavDropdown.Item>

                                <NavDropdown.Item>Profile</NavDropdown.Item>

                                <NavDropdown.Item onClick={handelLogout}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
