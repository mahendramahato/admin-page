
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddAnimals } from './components/AddAnimals';
import { ListAnimals } from './components/ListAnimals';
import { AssignPet } from './components/AssignPet';
import { Dashboard } from './components/Dashboard';
import { EditForm } from './components/EditForm';
import { ListData } from './components/ListData';
import { MoreInfo } from './components/MoreInfo';
import { UpdateForm } from './components/UpdateForm';
import { AssignedClientList } from './components/AssignedClientList';
import { AssignedClientInfo } from './components/AssignedClientInfo';
import { EditAssignedClient } from './components/EditAssignedClient';
import { UpdateAssignedClient } from './components/UpdateAssignedClient';

function App() {
  return (
    <div>
      <Router>
        <div className="container-fluid">
          <Routes>
            
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/add_animals" element={<AddAnimals />} />
            <Route path="/list_animals" element={<ListAnimals />} />

            <Route path="/form_list" element={<ListData />} />
            <Route path="/more_info/:formId" element={<MoreInfo />} />
            <Route path="/edit_forms" element={<EditForm />} />
            <Route path="/edit_client_info_&_data/:formId" element={<UpdateForm />} />

            <Route path="/assign_pet/:formId" element={<AssignPet />} />
            <Route path="/assigned_client_list" element={<AssignedClientList />} />
            <Route path="/assigned_client_more_info/:aaId" element={<AssignedClientInfo />} />
            <Route path="/edit_assigned_client_list" element={<EditAssignedClient />} />
            <Route path="/update_assigned_client_list/:aaId" element={<UpdateAssignedClient />} />

          </Routes>    
        </div>
      </Router>    
    </div>
  );
}

export default App;
