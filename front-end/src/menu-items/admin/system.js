// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';

// constant
const icons = {
    PermIdentityIcon,
    SettingsApplicationsOutlinedIcon
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const other = {
    id: 'system',
    title: 'Quản trị hệ thống',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Quản lý người dùng',
            type: 'item',
            url: '/users',
            icon: icons.PermIdentityIcon,
            breadcrumbs: false
        },
        {
            id: 'system-config',
            title: 'Cấu hình hệ thống',
            type: 'item',
            url: '/system-config',
            icon: icons.SettingsApplicationsOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
