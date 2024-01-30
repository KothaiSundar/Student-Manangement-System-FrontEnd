import React, { useState } from 'react'
import {Link , useNavigate,} from "react-router-dom"
import axios from 'axios'




const AddAdmin=()=> {
    let navigate=useNavigate();
    const[errorMessage,setErrorMessage]=useState('');
   const[admins, setAdmins] = useState({
    adminName: '',
    adminEmail:'',
    adminPassword:'',
   })



const{adminName,adminEmail,adminPassword} = admins;

const handleInputChange=(e)=>{
setAdmins({...admins, [e.target.name] : e.target.value});
            // this name is name in input
     }


const saveAdmin = async (e)=>{
    e.preventDefault();

    try{
      console.log(admins);
      await axios.post("http://localhost:8080/admin",admins)
      console.log(admins);
      navigate("/view-admins");// to go to view students after saving 
  }
    catch(error){
      console.log("error saving admin", error);
      if(error.response && error.response.status===404){
         console.log("Not Found Error Response:",error.response.data);
         setErrorMessage('Email already exists. please use differnt email')
         setAdmins({...admins,adminEmail:''});
      }
      else{
         console.error("other error Response:",error.response.data);
      }
    }


   }
 

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
    
    <h2 className="mt-5"> Add Admin</h2>
       {/* Display the error message if it exists */}
       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
         
         
             <form onSubmit={(e)=>saveAdmin(e)}>
         

                 <div className="input-group mb-5">


                            <label className="input-group-text"
                            htmlFor="adminName">
                            AdminName
                            </label>


                            <input className="form-control col-sm-6"
                            type="text" name="adminName" id="adminName"
                            required value={adminName} onChange={(e) => handleInputChange(e)} />
                            
                 </div>

                 <div className="input-group mb-5">


                                <label className="input-group-text"
                                htmlFor="adminEmail">
                             AdminEmail
                                </label>


                                <input className="form-control col-sm-6"
                                type="email" name="adminEmail" id="adminEmail"
                                required value={adminEmail} onChange={(e) => handleInputChange(e)} />

                 </div>

                 <div className="input-group mb-5">


                                <label className="input-group-text"
                                htmlFor="adminEmail">
                             AdminPassword
                                </label>


                                <input className="form-control col-sm-6"
                                type="password" name="adminPassword" id="adminPassword"
                                required value={adminPassword} onChange={(e) => handleInputChange(e)} />

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
							to={"/view-admins"}
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

export default AddAdmin