// assets
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

// constant
const icons = {
  EventNoteIcon,
  FitScreenIcon,
  ViewListOutlinedIcon,
  WysiwygIcon,
  AssignmentTurnedInOutlinedIcon,
  LocalAtmIcon
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const other = {
  id: 'cong-tac-doan',
  title: 'Công tác đoàn',
  type: 'group',
  children: [
    {
      id: 'barcode',
      title: 'Barcode',
      type: 'collapse',
      icon: icons.FitScreenIcon,
      children: [
        {
          id: 'tra-cuu',
          title: 'Tra cứu',
          type: 'item',
          url: '/barcode/tra-cuu',
          breadcrumbs: false
        },
        {
          id: 'thong-ke',
          title: 'Thống kê',
          type: 'item',
          url: '/barcode/thong-ke',
          breadcrumbs: false
        }
      ]
    },
    // {
    //     id: 'ho-so',
    //     title: 'Hồ sơ đoàn vụ',
    //     type: 'item',
    //     url: '/ho-so',
    //     icon: icons.WysiwygIcon,
    //     breadcrumbs: false
    // },
    // {
    //     id: 'hoat-dong',
    //     title: 'Hoạt động',
    //     type: 'item',
    //     url: '/hoat-dong',
    //     icon: icons.EventNoteIcon,
    //     breadcrumbs: false
    // },
    // {
    //     id: 'diem-danh',
    //     title: 'Điểm danh',
    //     type: 'item',
    //     url: '/diem-danh',
    //     icon: icons.AssignmentTurnedInOutlinedIcon,
    //     breadcrumbs: false
    // },
    {
      id: 'chi-doan',
      title: 'Chi đoàn',
      type: 'item',
      url: '/chi-doan',
      icon: icons.ViewListOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'doan-phi',
      title: 'Sổ đoàn và đoàn phí',
      type: 'item',
      url: '/doan-phi',
      icon: icons.LocalAtmIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
