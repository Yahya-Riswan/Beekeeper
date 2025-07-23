import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../Context/userContext'
import { useNavigate } from "react-router"
import axios from "axios"
import "../../App.css"
import logo_bg from "../../Assets/logo_bg.png"

function Profile() {
    let navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [name,setName] = useState("")

    useEffect(()=>{
            if(localStorage.getItem("name")){
                setName(localStorage.getItem("name"))
            }else{
                navigate("/404")
            }
        },[])
    const logout = () =>{
        localStorage.clear()
        setUser({})
        navigate("/");
    }
    const deleteAccount = async ()=>{
        try{
            let id = localStorage.getItem("email")
            let res = await axios.delete("http://localhost:5000/users/"+id)
            console.log(res)
            localStorage.clear()
            setUser("")
            navigate("/");
        }catch(e){
            console.log(e)
            localStorage.clear()
            setUser("")
            navigate("/");
        }
    }
    return (
        <div className="profile">
            <img src={logo_bg} alt="" className="img" />
            <h1>Hi, {name}</h1>
            <div className="div">
                <button className='link' onClick={logout}>Logout</button>
                <button className='link' onClick={deleteAccount}>Delete User</button>
            </div>
        </div>
    )
}

export default Profile