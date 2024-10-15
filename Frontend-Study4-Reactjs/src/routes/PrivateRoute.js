import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { doLogout } from '../redux/action/userAction';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const role = useSelector((state) => state.user.account.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!isAuthenticated) {
        dispatch(doLogout());
        return <Navigate to="/login" />;
    }

    if (props.requiredRole && role !== props.requiredRole) {
        dispatch(doLogout());
        return <Navigate to="/login" />;
    }
    return <>{props.children}</>;
};

export default PrivateRoute;
