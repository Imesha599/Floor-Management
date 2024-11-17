import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Table = {
  id: string;
  type: 'square' | 'round';
  position: { x: number; y: number };
  name: string;
  minCovers: number;
  maxCovers: number;
};

interface TableState {
  tables: Table[];
  selectedTableId: string | null;
}

const initialState: TableState = {
  tables: [],
  selectedTableId: null,
};

const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
    selectTable: (state, action: PayloadAction<string>) => {
      state.selectedTableId = action.payload;
    },
    updateTableDetails: (state, action: PayloadAction<{ id: string; name: string; minCovers: number; maxCovers: number }>) => {
      const table = state.tables.find((t) => t.id === action.payload.id);
      if (table) {
        table.name = action.payload.name;
        table.minCovers = action.payload.minCovers;
        table.maxCovers = action.payload.maxCovers;
      }
    },
  },
});

export const { addTable, selectTable, updateTableDetails } = tableSlice.actions;
export default tableSlice.reducer;
