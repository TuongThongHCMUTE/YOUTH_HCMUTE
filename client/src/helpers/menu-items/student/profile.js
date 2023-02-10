// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';

// constant
const icons = {
  PermIdentityIcon,
  SettingsApplicationsOutlinedIcon
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const profile = {
  id: 'profile',
  title: 'Hồ sơ',
  type: 'group',
  children: [
    {
      id: 'ca-nhan',
      title: 'Thông tin cá nhân',
      type: 'item',
      url: '/student',
      icon: icons.PermIdentityIcon,
      breadcrumbs: false
    }
  ]
};

export default profile;
