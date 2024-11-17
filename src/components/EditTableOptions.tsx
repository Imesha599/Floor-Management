import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTableDetails } from '../store/tableSlice';
import { Formik, Form, Field } from 'formik';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const EditTableOptions: React.FC = () => {
  const dispatch = useDispatch();
  const { tables, selectedTableId } = useSelector((state: RootState) => state.tables);

  const selectedTable = tables.find((table) => table.id === selectedTableId);

  if (!selectedTable) {
    return (
      <Typography variant="body2" sx={{ textAlign: 'center', color: '#999' }}>
        Select a table to edit its details.
      </Typography>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginTop: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Edit Table
      </Typography>
      <Formik
        initialValues={{
          name: selectedTable.name,
          minCovers: selectedTable.minCovers,
          maxCovers: selectedTable.maxCovers,
        }}
        onSubmit={(values) => {
          dispatch(updateTableDetails({ id: selectedTable.id, ...values }));
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Min Covers"
              name="minCovers"
              type="number"
              value={values.minCovers}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Max Covers"
              name="maxCovers"
              type="number"
              value={values.maxCovers}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Save
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default EditTableOptions;
