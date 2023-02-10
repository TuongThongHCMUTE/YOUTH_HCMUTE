// assets
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

// constant
const icons = {
  EventNoteIcon,
  FitScreenIcon,
  ViewListOutlinedIcon,
  WysiwygIcon,
  AssignmentTurnedInOutlinedIcon
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
        }
        // {
        //     id: 'thong-ke',
        //     title: 'Thống kê',
        //     type: 'item',
        //     url: '/barcode/thong-ke',
        //     breadcrumbs: false,
        // }
      ]
    },
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
      title: 'Danh sách chi đoàn',
      type: 'item',
      url: '/chi-doan',
      icon: icons.ViewListOutlinedIcon,
      breadcrumbs: false
    }
  ]
};

export default other;
