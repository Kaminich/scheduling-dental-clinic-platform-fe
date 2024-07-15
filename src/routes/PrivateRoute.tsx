import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
    roleAuth: string;
    element: ReactElement;
}

const PrivateRoute = ({ roleAuth, element }: Props) => {
    const { role } = useAuth();
    return role === roleAuth ? element : <Navigate to="/not-found" replace />;
};

export default PrivateRoute;
