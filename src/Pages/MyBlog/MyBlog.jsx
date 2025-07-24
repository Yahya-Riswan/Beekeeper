import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../Context/userContext'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router"
import BlogData from '../../Components/BlogData/BlogData'
import "./style.css"
function MyBlog() {
    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [login, setLogin] = useState("")
    const [userid, setUserId] = useState("")
    const [myblogs, setMyBlogs] = useState()
    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("name")) {
            setUserId(localStorage.getItem("email"));
            setLogin(true)
        } else if (user && user.email && user.name) {
            setUserId(user.id)
            setLogin(true)
        } else {
            setUserId("")
            setLogin(false)
        }
    }, [user])
    useEffect(()=>{
        if(userid){
            let myblogsdata = async ()=>{
                try{
                    let res = await axios.get(`http://localhost:5000/blogs?authorId=${userid}`)
                    console.log(res.data)
                    setMyBlogs(res.data)
                }catch(e){
                    setLogin(false)
                }
            }
            myblogsdata()
        }
    }, [userid])
    const updateblog = (data) => {
        localStorage.setItem("tempupdatedata",JSON.stringify(data))
        navigate("/UpdateBlog")
    }
    const deleteblog = async (blogid) => {
        try{
            await axios.delete(`http://localhost:5000/blogs/${blogid}`)
            let res = await axios.get(`http://localhost:5000/blogs?authorId=${userid}`)
            console.log(res.data)
            setMyBlogs(res.data)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className="myblog">
            {
                login &&
                <div className="content">
                    <h1>My Blogs</h1>
                    <div className="blogs">
                        {
                            myblogs && [...myblogs].reverse().map((blog)=>(
                                <BlogData key={blog.id} id={blog.id} title={blog.title} update={()=>updateblog(blog)} remove={()=>deleteblog(blog.id)} />
                            ))
                        }
                    </div>
                </div>
            }
            {
                !login &&
                <div className="content logins">
                    <h1>To See Your Blogs You Need To Login</h1>
                    <div className="right div">
                        <Link to={"/Login"} className='link l1'>Login</Link>
                        <Link to={"/Register" } className='link l2'>Register</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyBlog