import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Searchh from '../common/Searchh';
import {Link} from "react-router-dom"

import {FaEye, FaEdit, FaTrashAlt} from "react-icons/fa";


const ViewAllStudentsOfThatAdmin = () => {

    const { adminId } = useParams();
    let navigate = useNavigate();
    const [search,setSearch]=useState("");
    const [students, setStudents] = useState([]);
//const[admins,setAdmins]=useState([]);
    useEffect(() => {
      loadStudents();
   }, []);




    const loadStudents = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/student/admin?adminId=${adminId}`);
    
        if (result.data.data && result.data.data.length > 0) {
          // Set students if there are students
          setStudents(result.data.data);
        } else {
          // Set students to an empty array if no students are present
          setStudents([]);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (resource not found)
          console.log('No students found for the given admin ID');
          setStudents([]);
        } else {
          // Handle other errors
          console.error('Error fetching students:', error);
          // You might want to display an error message to the user or take other actions.
        }
      }
    };

    const handleDelete = async(studentId) => {
      await axios.delete(`http://localhost:8080/student?studentId=${studentId}&adminId=${adminId}`)
loadStudents();
    }

     



     


  return (
    <section>
                         <button className="nav-item">
                        <Link className="nav-link" to={`/add-student/${adminId}`} >
                            Add new Students
                        </Link>
                      </button>




                      {/* <Link to={`/add-student/${admins.adminId}`} className="btn btn-info">
  Add Student
</Link> */}
                              <h2>Students List</h2>
                                <Searchh search={search} 
                                setSearch={setSearch}/>
                                

      <table className="table table-bordered table-hover shadow">
                <thead>
                     

                            <tr className="text-center">
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            <th colSpan="3">Actions</th>
                            </tr>
                </thead>
         

        <tbody className="text-center">



          {students.filter((st) =>
                   
                   
                   st.studentName.toLowerCase().includes(search)). 
                   map((student, index) => (

                            <tr key={student.studentId}>

                            <th scope='row' key={index}>
                                {index + 1}
                            </th>

                            <td>{student.studentName}</td>
                            <td>{student.studentEmail}</td>
                            <td className="mx-2">
                            <Link to=
                            {`/student-profile/${student.studentId}`} className="btn btn-info"> 
                                      <FaEye />
                                     
                               
                                    </Link>
                            </td>


                             <td className="mx-2">

                                  <Link to={`/edit-student/${adminId}/${student.studentId}`} className="btn btn-warning"> 
                                      <FaEdit />
                                     
                                 
                                    </Link>
                              </td>


                             <td className="mx-2">

                                   <button className="btn btn-danger"
                                   onClick={()=> handleDelete(student.studentId)}>
                                         <FaTrashAlt />
                                         {/* to get delete buttton */}
                                    </button>

                              
                              </td>
                        
                
                    </tr>






          ))}


        </tbody>
      </table>
    </section>
  )
}

export default ViewAllStudentsOfThatAdmin