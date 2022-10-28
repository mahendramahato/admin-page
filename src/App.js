
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { ListData } from './components/ListData';
import { MoreInfo } from './components/MoreInfo';

function App() {
  return (
    <div>
      <Router>
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form_list" element={<ListData />} />
            <Route path="/more_info/:id" element={<MoreInfo />} />
          </Routes>    
        </div>
      </Router>    
    </div>
  );
}

export default App;
