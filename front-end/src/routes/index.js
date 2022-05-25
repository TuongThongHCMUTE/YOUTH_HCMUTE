import { useRoutes } from 'react-router-dom';

// routes
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import StudentRoutes from './StudentRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([...PublicRoutes, AdminRoutes, StudentRoutes, AuthenticationRoutes]);
}
