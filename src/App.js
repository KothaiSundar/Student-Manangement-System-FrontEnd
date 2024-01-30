import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css';
import Home from "./Home"
import NavBar from "./components/common/NavBar.js";
import StudentsView from './components/student/StudentsView';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./components/student/AddStudent.js";
import EditStudent from "./components/student/EditStudent.js";
import StudentProfile from "./components/student/StudentProfile.js";
import ViewAdmin from "./components/admin/ViewAdmin.js";
import ViewAllStudentsOfThatAdmin from "./components/admin/ViewAllStudentsOfThatAdmin.js";
import EditAdmin from "./components/admin/EditAdmin.js";
import AddAdmin from "./components/admin/AddAdmin.js";
function App() {
  return (

    <main className="container mt-5">
      
       
         <Router>
           <NavBar />

            <Routes>

                   <Route exact path="/" element={<Home />}>

                   </Route>
                   <Route exact path="/view-Admins" element={<ViewAdmin />}>

                        </Route>

                        <Route exact path="/view-AllStudents/:adminId" element={<ViewAllStudentsOfThatAdmin />}>

                            </Route>

                            <Route exact path="/add-admins" element={<AddAdmin />}>

                                      </Route>


                            <Route exact path="/edit-admin/:adminId" element={<EditAdmin />}>

                                          </Route>


                   <Route exact path="/view-students" element={<StudentsView />}>

                    </Route>

                    <Route path="/add-student/:adminId" element={<AddStudent />}>

                      </Route>

                      <Route exact path="/edit-student/:adminId/:studentId" element={<EditStudent />}>

                      </Route>


                      <Route exact path="/student-profile/:studentId" element={<StudentProfile />}>

                      </Route>


            </Routes>


         </Router>


    </main>
  );
}

export default App;
