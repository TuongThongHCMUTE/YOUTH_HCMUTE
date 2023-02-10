// assets
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// constant
const icons = {
  PermIdentityIcon,
  SettingsApplicationsOutlinedIcon,
  CalendarMonthIcon
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
      type: 'collapse',
      icon: icons.PermIdentityIcon,
      children: [
        {
          id: 'thong-ke-nguoi-dung',
          title: 'Thống kê',
          type: 'item',
          url: '/users/thong-ke-nguoi-dung',
          breadcrumbs: false
        },
        {
          id: 'quan-tri-vien',
          title: 'Quản trị viên',
          type: 'item',
          url: '/users/quan-tri-vien',
          breadcrumbs: false
        },
        {
          id: 'sinh-vien',
          title: 'Sinh viên',
          type: 'item',
          url: '/users/sinh-vien',
          breadcrumbs: false
        }
      ]
    },
    // {
    //     id: 'system-config',
    //     title: 'Cấu hình hệ thống',
    //     type: 'item',
    //     url: '/system-config',
    //     icon: icons.SettingsApplicationsOutlinedIcon,
    //     breadcrumbs: false
    // }
    {
      id: 'nam-hoc',
      title: 'Năm học',
      type: 'item',
      url: '/nam-hoc',
      icon: icons.CalendarMonthIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
