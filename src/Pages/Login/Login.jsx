import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../Context/userContext'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router"
import axios from "axios"
import "../../App.css"
import logo_bg from "../../Assets/logo_bg.png"

function Login() {
    let navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [error,setError] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    useEffect(()=>{
        if(localStorage.getItem("email") && localStorage.getItem("pass")){
            setEmail(localStorage.getItem("email"))
            setPass(localStorage.getItem("pass"))
        }
    },[])

    const login = async()=>{
        if(!email || !pass){
            setError("Please Fill All The Fields.")
        }else{
            try{
                let res = await axios.get("http://localhost:5000/users/"+email)
                console.log(res.data.id)
                if(res.data.id === email && res.data.pass === pass){
                    localStorage.setItem("email",res.data.id);
                    localStorage.setItem("pass",res.data.pass);
                    localStorage.setItem("name",res.data.name);
                    setUser({...res.data});
                    navigate("/Profile")
                }else{
                    setError("Email or Password is Incorrect!")
                }
            }catch(e){
                setError("Email Not Found , Register Again!")
                console.log(e)
            }
        }
    }
    return (
        <div className="login">
            <div className="form">
                <img src={logo_bg} alt="" className="img" />
                <h1>login</h1>
                <label htmlFor="name">Email : </label>
                <input type="text" name="email" id="email" placeholder='Email ...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="pass">Password : </label>
                <input type="text" name="pass" id="pass" placeholder='Password ...' value={pass} onChange={(e)=>setPass(e.target.value)}/>

                <button onClick={login}>Login</button>
                <pre>{error}</pre>
                <h5>Are You New. <Link to={"/Register"} className='link'>Register Now.</Link></h5>
            </div>
        </div>
    )
}

export default Login