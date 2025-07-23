import React,{useState, useEffect, useContext} from 'react'
import UserContext from "../../Context/userContext";
import { Link } from 'react-router-dom'
import "./style.css"
import logo from "../../Assets/logo_bg.png"
function Header() {
  const { user } = useContext(UserContext);
  const [login,setLogin] = useState(false);
  const [username,setUsername] = useState("");
  useEffect(()=>{
    if(localStorage.getItem("email") && localStorage.getItem("name")){
      setLogin(true)
      setUsername(localStorage.getItem("name"))
    }else if(user && user.email && user.name){
      setLogin(true)
      setUsername(user.name)
    }else{
      setLogin(false)
      setUsername("")
    }
  },[user])
  return (
    <div className="header">
        <Link to={"/"} className="left div">
            <img src={logo} alt="" className="logo" />
            <h1 className="title">Beekeeper - Blogs</h1>
        </Link>
        <div className="div">
            <Link to={"/CreateBlog"} className='create'>Create Blog</Link>
        </div>
        {!login &&
          <div className="right div">
              <Link to={"/Login"} className='link l1'>Login</Link>
              <Link to={"/Register" } className='link l2'>Register</Link>
          </div>
        }
        {login && 
          <div className="right div">
              <Link to={"/Profile"} className='link l1'>Hi, {username}</Link>
          </div>
        }
    </div>
  )
}

export default Header