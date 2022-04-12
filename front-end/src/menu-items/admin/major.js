// assets
import FitScreenIcon from '@mui/icons-material/FitScreen';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

// constant
const icons = {
    FitScreenIcon,
    ViewListOutlinedIcon,
    WysiwygIcon
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
                    id: 'search',
                    title: 'Tra cứu',
                    url: '/barcode',
                    type: 'item',
                    breadcrumbs: false,
                },
                {
                    id: 'thong-ke',
                    title: 'Thống kê',
                    url: '/barcode/thong-ke',
                    type: 'item',
                    breadcrumbs: false,
                }
            ]
        },
        {
            id: 'documentation',
            title: 'Hồ sơ đoàn vụ',
            type: 'item',
            url: '/ho-so',
            icon: icons.WysiwygIcon,
            breadcrumbs: false
        },
        {
            id: 'list',
            title: 'Danh sách chi đoàn',
            type: 'item',
            url: '/chi-doan',
            icon: icons.ViewListOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
