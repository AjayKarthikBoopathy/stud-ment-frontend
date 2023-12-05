import React, { useState } from 'react';
import './App.css';
import Users from './Components/Users';
import AddUser from './Components/AddUser';

import Mentors from './Components/Mentor/Mentor';
import AddMentor from './Components/Mentor/AddMentor';
import UpdateMentor from './Components/Mentor/UpdateMentor';
import MyStudents from './Components/Mentor/myStudents';
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UpdateUser from './Components/UpdateUser'
import Base from './Base/Base';
import MyMentors from './Components/my_mentor';
import NewStudent from './Components/NewStudent';

function App() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  //const navigate = useNavigate()
  


  return (
    <div className="App">

    
    
    <Switch>

      <Route exact path="/">
             <Base>
              <div className='title-info'>
                <h2>Welcome to our institution website...</h2>
              </div>
             </Base>
        
      </Route>

      <Route path="/students/all">
             
        <Users
          students={students}
          setStudents={setStudents}
        />
      </Route>

      <Route path="/students/add">
        <AddUser
          students={students}
          setStudents={setStudents}
        />
      </Route>

      <Route path="/students/edit/:id">
        <UpdateUser
          students={students}
          setStudents={setStudents}
        />
      </Route>

      <Route path="/students/my-mentors/:id">
        <MyMentors
          students={students}
          setStudents={setStudents}
        />
      </Route>

      <Route path="/mentors/new-student/:id">
        <NewStudent
          students={students}
          setStudents={setStudents}
        />
      </Route>

      <Route path="/mentors/all">
             
        <Mentors
          mentors={mentors}
          setMentors={setMentors}
        />
      </Route>

      <Route path="/mentors/add">
        <AddMentor
          mentors={mentors}
          setMentors={setMentors}
        />
      </Route>

      <Route path="/mentors/edit/:id">
        <UpdateMentor
          mentors={mentors}
          setMentors={setMentors}
        />
      </Route>

      <Route path="/mentors/my-students/:id">
        <MyStudents
          mentors={mentors}
          setMentors={setMentors}
        />
      </Route>

    </Switch>

    </div>
  );
}

export default App;
