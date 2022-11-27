import React from 'react';
// Material UI ============================================================= //
import Skeleton from '@mui/material/Skeleton';

// ===========================|| SKELETON IMAGE CARD ||=========================== //

const ImagePlaceholder = ({ ...others }) => <Skeleton variant="rect" {...others} animation="wave" />;

export default ImagePlaceholder;
