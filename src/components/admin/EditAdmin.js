import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"

const EditAdmin=()=> {
  
  let navigate = useNavigate();
  const[errorMessage,setErrorMessage]=useState('');
  const{ adminId }=useParams();

  const[admins, setAdmins] = useState({
    adminName: '',
    adminEmail:'',
    adminPassword:''

  })
  const [showPassword, setShowPassword] = useState(false);


const{adminName,adminEmail,adminPassword} = admins;




useEffect(() => {
    loadAdmins();
 }, []);



const loadAdmins = async()=>{
    const result = await axios.get(`http://localhost:8080/admin/adminUser?adminId=${adminId}`);
    
    setAdmins(result.data.data);
    console.log("admin"+adminPassword);
  
  
}

const handleInputChange=(e)=>{
    setAdmins({...admins, [e.target.name] : e.target.value});
           // this name is name in input
    }
console.log(admins);


const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

const updateAdmin = async (e)=>{
   e.preventDefault();
   try{
    await axios.put(`http://localhost:8080/admin/adminUser?adminId=${adminId}`, admins)
    console.log(admins);
    navigate("/view-Admins");
    }// to go to view admins after saving }
  
    catch(error){
        console.log("error updating admin", error);
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

    <h2 className="mt-5"> Edit Admin</h2>
             {/* Display the error message if it exists */}
       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={(e) => updateAdmin(e)}>
        

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
                        htmlFor="adminPassword">
                        AdminPassword
                        </label>

                                                <input
                                    className="form-control col-sm-6"
                                    type={showPassword ? "text" : "password"}
                                    name="adminPassword"
                                    id="adminPassword"
                                    required
                                    value={adminPassword}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <div className="input-group-append">
                                    <span
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                    >
                                    {showPassword ? "👁️" : "🔒"}
                                    </span>
                                    </div>

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

export default EditAdmin