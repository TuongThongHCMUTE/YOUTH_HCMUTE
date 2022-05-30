// assets
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

// constant
const icons = {
    TravelExploreIcon,
    EventNoteIcon,
    DocumentScannerIcon
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const activity = {
    id: 'hoat-dong',
    title: 'Hoạt động',
    type: 'group',
    children: [
        {
            id: 'search',
            title: 'Tìm kiếm',
            type: 'item',
            url: '/new-feed',
            icon: icons.TravelExploreIcon,
            breadcrumbs: false
        },
        {
            id: 'my-activity',
            title: 'Hoạt động của tôi',
            type: 'item',
            url: '/ca-nhan/hoat-dong',
            icon: icons.EventNoteIcon,
            breadcrumbs: false
        },
        {
            id: 'doan-vu',
            title: 'Đoàn vụ',
            type: 'item',
            url: '/ca-nhan/doan-vu',
            icon: icons.DocumentScannerIcon,
            breadcrumbs: false
        }
    ]
};

export default activity;
