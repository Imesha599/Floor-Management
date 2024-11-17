import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { RootState } from '../store';
import { addTable, selectTable, updateTableDetails } from '../store/tableSlice';
import { DragItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, Button, AppBar, Toolbar, Paper, TextField } from '@mui/material';
import { Formik } from 'formik';
import DraggableTable from './DraggableTable';

const Room: React.FC = () => {
  const dispatch = useDispatch();
  const { tables, selectedTableId } = useSelector((state: RootState) => state.tables);
  const canvasRef = React.useRef<HTMLDivElement>(null);

  // Drop handler for adding tables to the canvas
  const [, drop] = useDrop({
    accept: ['square', 'round'],
    drop: (item: DragItem, monitor) => {
      const offset = monitor.getClientOffset();
      if (canvasRef.current && offset) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;

        dispatch(
          addTable({
            id: uuidv4(),
            type: item.type,
            position: { x, y },
            name: `Table ${tables.length + 1}`,
            minCovers: 1,
            maxCovers: 4,
          })
        );
      }
    },
  });

  // Save room to local storage
  const saveRoom = () => {
    localStorage.setItem('roomLayout', JSON.stringify(tables));
    alert('Room layout saved!');
  };

  // Add a new room (reset layout)
  const addRoom = () => {
    localStorage.removeItem('roomLayout'); // Clear saved layout
    window.location.reload(); // Reload the page
  };

  // Find the selected table details
  const selectedTable = tables.find((table) => table.id === selectedTableId);

  return (
    <Box sx={{ height: '100%',width: '100vw', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="inherit" variant="outlined" onClick={saveRoom} sx={{ marginRight: 2 }}>
            Save Room
          </Button>
          <Button color="inherit" variant="contained" onClick={addRoom}>
            Add Room
          </Button>
        </Toolbar>
      </AppBar>

      {/* Room Layout Canvas */}
      <Box
        ref={canvasRef}
        sx={{
          flexGrow: 1, // Ensures the canvas fills the remaining space
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          marginTop: 2,
          position: 'relative',
        }}
        {...drop(canvasRef)} // Attach drop functionality here
      >
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
            color: '#888',
          }}
        >
          Room Layout
        </Typography>
        {tables.map((table) => (
          <DraggableTable
            key={table.id}
            table={table}
            isSelected={table.id === selectedTableId}
            onSelect={() => dispatch(selectTable(table.id))}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Room;
