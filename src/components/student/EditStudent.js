import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"

const EditStudent=()=> {
    const { adminId } = useParams();
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const{ studentId }=useParams();

  const[student, setStudent] = useState({
   studentName: '',
   studentEmail:'',
  })



const{studentName,studentEmail} = student;




useEffect(() => {
    loadStudents();
 }, []);



const loadStudents = async()=>{
    const result = await axios.get(`http://localhost:8080/student?studentId=${studentId}`);
    
    setStudent(result.data.data);
  
  
}

const handleInputChange=(e)=>{
setStudent({...student, [e.target.name] : e.target.value});
           // this name is name in input
    }

console.log(student);
const updateStudent = async (e)=>{
   e.preventDefault();
try{
   await axios.put(`http://localhost:8080/student/userInterface?adminId=${adminId}&studentId=${studentId}`,student)
   console.log(student);
   navigate(`/view-AllStudents/${adminId}`);// to go to view students after saving 
}
catch (error) 
{
  console.error("Error updating student:", error);
        if (error.response && error.response.status === 404) 
        {
          console.log("Not Found Error Response:", error.response.data);
          setErrorMessage('Email already exists. Please use a different email.');
          setStudent({ ...student, studentEmail: '' });
        } 
        else {
          console.error("Other Error Response:", error.response.data);
          // Handle other errors appropriately
        }
}
}


 return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">

    <h2 className="mt-5"> Edit Student</h2>
    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} 
            <form onSubmit={(e) => updateStudent(e)}>
        

                <div className="input-group mb-5">


                           <label className="input-group-text"
                           htmlFor="studentName">
                           StudentName
                           </label>


                           <input className="form-control col-sm-6"
                           type="text" name="studentName" id="studentName"
                           required value={studentName} onChange={(e) => handleInputChange(e)} />
                           
                </div>

                <div className="input-group mb-5">


                               <label className="input-group-text"
                               htmlFor="studentEmail">
                            StudentEmail
                               </label>


                               <input className="form-control col-sm-6"
                               type="email" name="studentEmail" id="studentEmail"
                               required value={studentEmail} onChange={(e) => handleInputChange(e)} />

                </div>

                <div className="row mb-5">
                   <div className="col-sm-2">
                       <button
                           type="submit"
                           className="btn btn-outline-success btn-lg">
                           Save
                       </button>
                   </div>

                   <div className="col-sm-2">
                       <Link
                           to={"/view-students"}
                           type="submit"
                           className="btn btn-outline-warning btn-lg">
                           Cancel
                       </Link>
                   </div>
               </div>
            </form>


   </div>
 )
}

export default EditStudent