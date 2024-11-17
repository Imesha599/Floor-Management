import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectTable } from '../store/tableSlice';
import roundTableImg from '../assets/Table.svg';
import squareTableImg from '../assets/Table.svg';

interface DraggableTableProps {
  table: {
    id: string;
    type: 'square' | 'round';
    position: { x: number; y: number };
    name: string;
    minCovers: number;
    maxCovers: number;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const DraggableTable: React.FC<DraggableTableProps> = ({ table, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => dispatch(selectTable(table.id))}
      sx={{
        position: 'absolute',
        left: table.position.x,
        top: table.position.y,
        width: '60px',
        height: '60px',
        backgroundImage: `url(${table.type === 'round' ? roundTableImg : squareTableImg})`,
        backgroundSize: 'cover',
        borderRadius: table.type === 'round' ? '50%' : '4px',
        border: isSelected ? '2px solid #004ba0' : '1px solid #888',
        boxShadow: isSelected ? '0 4px 10px rgba(0, 0, 0, 0.3)' : 'none',
        cursor: 'pointer',
        zIndex: isSelected ? 2 : 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: isSelected ? '#fff' : '#000',
          backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
          borderRadius: '4px',
          padding: '2px 4px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {table.name}
      </Typography>
    </Box>
  );
};

export default DraggableTable;
