// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// constant
const icons = {
    QueryStatsIcon,
    IconDashboard,
    IconDeviceAnalytics
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.QueryStatsIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
