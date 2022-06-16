// Node Modules ============================================================ //
import React from 'react';
// Material UI ============================================================= //
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ============================|| PROGRESS BAR ||=========================== //
const LinearProgressBarWithLabel = (props) => {
    const { value, maxValue } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} className="linear-progress-bar">
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={(value/maxValue)*100} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                {`${value}/${maxValue}`}
                </Typography>
            </Box>
      </Box>
    )
}

export default LinearProgressBarWithLabel