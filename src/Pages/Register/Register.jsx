import React, { useState } from 'react'
import {useNavigate} from "react-router"
import { Link } from 'react-router-dom'
import axios from "axios"
import "../../App.css"
import logo_bg from "../../Assets/logo_bg.png"

function Register() {
    let navigate = useNavigate();
    const [error,setError] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const register=async()=>{
        if(!name || !email || !pass){
            setError("Please Fill All The Fields.")

        }else{
            try{
                let res = await axios.get("http://localhost:5000/users/"+email)
                console.log(res.data.id)
                if(res.data.id === email){
                    localStorage.setItem("email",email);
                    localStorage.setItem("pass",pass);
                    setError("Email Already Exists. Please Login!")
                }
            }catch(e){
                console.log(e)
                let res = await axios.post("http://localhost:5000/users",{id:email,pass:pass,name:name})
                localStorage.setItem("email",email);
                localStorage.setItem("pass",pass);
                localStorage.setItem("name",name);

                console.log("succes",res)
                navigate("/Login")
            }
        }
        
        
        
    }
    return (
        <div className="register">
            <div className="form">
                <img src={logo_bg} alt="" className="img" />
                <h1>Register</h1>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name" id="name" placeholder='Full Name ...' value={name} onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="name">Email : </label>
                <input type="text" name="email" id="email" placeholder='Email ...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="pass">Password : </label>
                <input type="text" name="pass" id="pass" placeholder='Password ...' value={pass} onChange={(e)=>setPass(e.target.value)}/>

                <button onClick={register}>Register</button>
                <pre>{error}</pre>
                <h5>Are You Already Registered. <Link to={"/Login"} className='link'>Login Now.</Link></h5>
            </div>
        </div>
    )
}

export default Register