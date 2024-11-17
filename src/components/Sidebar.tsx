import React from 'react';
import { useDrag } from 'react-dnd';
import { DragItem } from '../types';
import { Box, Typography, Paper } from '@mui/material';
import roundTableImg from '../assets/Table.svg';
import squareTableImg from '../assets/Table.svg';
import EditTableOptions from './EditTableOptions'; // Import the EditTable component

const Sidebar: React.FC = () => {
  const [{ isDraggingSquare }, dragSquare] = useDrag(() => ({
    type: 'square',
    item: { type: 'square' } as DragItem,
    collect: (monitor) => ({
      isDraggingSquare: monitor.isDragging(),
    }),
  }));

  const [{ isDraggingRound }, dragRound] = useDrag(() => ({
    type: 'round',
    item: { type: 'round' } as DragItem,
    collect: (monitor) => ({
      isDraggingRound: monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        width: '250px',
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Table Options
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Square Table */}
        <Box
          ref={dragSquare}
          sx={{
            opacity: isDraggingSquare ? 0.5 : 1,
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          <img
            src={squareTableImg}
            alt="Square Table"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="body2">Square Table</Typography>

        {/* Round Table */}
        <Box
          ref={dragRound}
          sx={{
            opacity: isDraggingRound ? 0.5 : 1,
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            border: '1px solid #ddd',
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          <img
            src={roundTableImg}
            alt="Round Table"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="body2">Round Table</Typography>
      </Box>

      {/* Edit Table Options */}
      <Box sx={{ marginTop: 4 }}>
        <EditTableOptions />
      </Box>
    </Paper>
  );
};

export default Sidebar;
