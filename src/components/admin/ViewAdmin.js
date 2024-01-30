import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FaEdit, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom"
import SearchAdmin from '../common/SearchAdmin';
//import Searchh from '../common/Searchh';


const ViewAdmin = () =>{

    const [admins, setAdmins]= useState([]);

    const [search,setSearch]=useState("");



     useEffect(() => {
        loadAdmins();
     
     }, []);


   
    const loadAdmins = async()=>{
   
        const result = await axios.get("http://localhost:8080/admin/all",{
            ValidateStatus: () =>{
                return true;     
              }
           
        });  
      
        setAdmins(result.data.data);
   
      
    }

    const handleDelete = async(adminId) => {


      await axios.delete(`http://localhost:8080/admin?adminId=${adminId}`)
      
     
          loadAdmins();
        
           
    }

    // const viewStudentsOfAdmin = async(adminId) => {
    //  const result1= await axios.get(`http://localhost:8080/student/admin?adminId=${adminId}`)
    //  loadAdmins();
    //  setAdmins(result1.data.data);
    
    // }
    

  return (
    <section>

<h2>Admins List</h2>
      <SearchAdmin search={search}
      setSearch={setSearch}
      
      />
     <table className="table table-bordered table-hover shadow">


        <thead>

           <tr className="text-center">
              <th>Id</th>
              <th>AdminName</th>
              <th>AdminEmail</th>
             {/* <th>AdminPassword</th> */}
              <th colSpan="3">Actions</th>
                          
           </tr>
        </thead>


        <tbody className="text-center">

                   
            {admins.filter((ad) =>
                   
                   
                   ad.adminName.toLowerCase().includes(search)). map((admins, index) => (

                           <tr key={admins.adminId}>

                            <th scope='row' key={index}>
                                {index + 1}
                            </th>

                            <td>{admins.adminName}</td>
                            <td>{admins.adminEmail}</td>
                             {/* <td>{admins.adminPassword}</td> */}

                            <td className="mx-2">
                          <Link to=
                            {`/view-AllStudents/${admins.adminId}`} className="btn btn-info"> 
                                     View Students
                                     
                               
                                    </Link>
                            </td>

                   


                            <td className="mx-2">

                                          <Link to={`/edit-admin/${admins.adminId}`} className="btn btn-warning"> 
                                              <FaEdit />
                                            

                                            </Link>
                                          </td>


                                          <td className="mx-2">

                                                    <button className="btn btn-danger"
                                                    onClick={()=> handleDelete(admins.adminId)}>
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

export default ViewAdmin;