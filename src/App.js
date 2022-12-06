
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { UpdateAnimal } from './components/UpdateAnimal';
import { LoginPage } from './components/LoginPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            
            <Route element={<ProtectedRoute />} >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/add_animals" element={<AddAnimals />} />
              <Route path="/list_animals" element={<ListAnimals />} />
              <Route path="/update_animals/:animalId" element={<UpdateAnimal />} />

              <Route path="/form_list" element={<ListData />} />
              <Route path="/more_info/:formId" element={<MoreInfo />} />
              <Route path="/edit_forms" element={<EditForm />} />
              <Route path="/edit_client_info_&_data/:formId" element={<UpdateForm />} />

              <Route path="/assign_pet/:formId" element={<AssignPet />} />
              <Route path="/assigned_client_list" element={<AssignedClientList />} />
              <Route path="/assigned_client_more_info/:aaId" element={<AssignedClientInfo />} />
              <Route path="/edit_assigned_client_list" element={<EditAssignedClient />} />
              <Route path="/update_assigned_client_list/:aaId" element={<UpdateAssignedClient />} />
            </Route>
              <Route exact path="/" element={<LoginPage />} />
              <Route path="/login_page" element={<LoginPage />} />

          </Routes>    
      </Router>    
    </div>
  );
}

export default App;
