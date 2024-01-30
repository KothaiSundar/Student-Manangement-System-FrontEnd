import React, { useEffect, useState } from 'react'
import axios from "axios";
import {FaEye, FaEdit, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom"
import Searchh from '../common/Searchh';


const StudentsView = () =>{

    const [students, setStudents]= useState([]);
    const [search,setSearch]=useState("");

     useEffect(() => {
        loadStudents();
     }, []);



    const loadStudents = async()=>{
        const result = await axios.get("http://localhost:8080/student/admin?adminId=2",{
            ValidateStatus: () =>{
                return true;
              }
        });
        
        setStudents(result.data.data);
      
      
    }
   
    const handleDelete = async(studentId) => {
      await axios.delete(`http://localhost:8080/student?studentId=${studentId}&adminId=2`)
loadStudents();
    }

     


  return (
    <section>

      <Searchh search={search}
      setSearch={setSearch}
      
      />
     <table className="table table-bordered table-hover shadow">


        <thead>

           <tr className="text-center">
              <th>Id</th>
              <th>StudentName</th>
              <th>StudentEmail</th>
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

                                  <Link to={`/edit-student/${student.studentId}`} className="btn btn-warning"> 
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

export default StudentsView