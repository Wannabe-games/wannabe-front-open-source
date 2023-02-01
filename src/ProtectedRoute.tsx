import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@/store/slices/auth.slice';

interface PrivateRouteProps {
    component: React.ComponentType;
    path?: string;
}

export const ProtectedRoute = ({ component: RouteComponent }: PrivateRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();

    if (isAuthenticated) {
        return <RouteComponent />;
    }

    return <Navigate to="/login" replace state={{ from: location }} />;
};
