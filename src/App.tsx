// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import Sidebar from './components/Sidebar';
import Room from './components/Room';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <Sidebar />
          <Room />
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
