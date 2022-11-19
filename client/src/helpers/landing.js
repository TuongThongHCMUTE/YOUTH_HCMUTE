import FitScreenOutlinedIcon from '@mui/icons-material/FitScreenOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';

export const LANDING_PAGE_SECTIONS = [
  {
    id: 'header',
    display: 'Home'
  },
  {
    id: 'introduction',
    display: 'Giới thiệu'
  },
  {
    id: 'feature',
    display: 'Chức năng'
  },
  {
    id: 'student',
    display: 'Sinh viên'
  },
  {
    id: 'admin',
    display: 'Quản trị viên'
  },
  {
    id: 'contact',
    display: 'Liên hệ'
  }
];

export const LANDING_PAGE_INTRODUCTION = {
  header: 'TRANG THÔNG TIN QUẢN LÝ ĐOÀN VIÊN',
  subHeader: 'Trường Đại học Sư phạm Kỹ Thuật TP. Hồ Chí Minh',
  description:
    'Website cung cấp các công cụ tiện ích hỗ trợ Đoàn trường, Đoàn khoa ' +
    'quản lý thông tin, hồ sơ đoàn vụ của sinh viên ' + 
    'trường Đại học Sư phạm Kỹ thuật thành phố Hồ Chí Minh. ' + 
    'Đồng thời website có thể theo dõi thông tin về việc ' + 
    'nộp sổ đoàn, nhận xét trong quá trình sinh hoạt Đoàn tại trường và đóng Đoàn phí.',
};

export const LANDING_PAGE_FEATURE = {
  header: 'Chức năng chính',
  quote: 'Cung cấp các tính năng hỗ trợ quản lý thông tin đoàn viên, hồ sơ, đoàn vụ',
  features: [
    {
      id: 'thu-so-doan',
      name: 'Thu sổ đoàn',
      description: 'Mô tả chức năng',
      icon: FitScreenOutlinedIcon,
    },
    {
      id: 'tra-cuu-thong-tin',
      name: 'Tra cứu thông tin đoàn viên',
      description: 'Mô tả chức năng',
      icon: SearchOutlinedIcon,
    },
    {
      id: 'phe-so-doan',
      name: 'Phê sổ đoàn trực tuyến',
      description: 'Mô tả chức năng',
      icon: DriveFileRenameOutlineOutlinedIcon,
    },
    {
      id: 'rut-so-doan',
      name: 'Đăng ký rút sổ đoàn',
      description: 'Mô tả chức năng',
      icon: GetAppOutlinedIcon,
    },
  ],
}
