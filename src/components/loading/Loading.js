import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading({ color='#190c4f' }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress sx={{
                color:color
            }} />
        </Box>
    )
}

export default Loading