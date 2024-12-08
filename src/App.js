import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableComponent from './components/TableComponent';
import InsertForm from './components/InsertForm';
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<TableComponent />} />
      <Route path="/insert" element={<InsertForm />} />
      <Route path="/update/:id" element={<UpdateForm />} />
    </Routes>
  </Router>
  );
}

export default App;
