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
            id: 'tim-kiem',
            title: 'Tìm kiếm',
            type: 'item',
            url: 'tim-kiem',
            icon: icons.TravelExploreIcon,
            breadcrumbs: false
        },
        {
            id: 'hoat-dong-cua-toi',
            title: 'Hoạt động của tôi',
            type: 'item',
            url: 'hoat-dong-cua-toi',
            icon: icons.EventNoteIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'doan-vu',
        //     title: 'Đoàn vụ',
        //     type: 'item',
        //     url: '/ca-nhan/doan-vu',
        //     icon: icons.DocumentScannerIcon,
        //     breadcrumbs: false
        // }
    ]
};

export default activity;
