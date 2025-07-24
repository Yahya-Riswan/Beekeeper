import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../Context/userContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router"

import "./style.css"
function UpdateBlog() {
    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [error, setError] = useState("")
    const [blogid, setBlogid] = useState("")
    const [login, setLogin] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [body, setBody] = useState("")
    const [username, setUserName] = useState("")
    const [userid, setUserId] = useState("")
    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("name")) {
            setUserId(localStorage.getItem("email"));
            setUserName(localStorage.getItem("name"))
            setLogin(true)
        } else if (user && user.email && user.name) {
            setUserId(user.id)
            setUserName(user.name)
            setLogin(true)
        } else {
            setUserId("")
            setUserName("")
            setLogin(false)
        }
    }, [user])
    useEffect(()=>{
        if(localStorage.getItem("tempupdatedata")){
            let data = JSON.parse(localStorage.getItem("tempupdatedata"))
            setBlogid(data.id)
            setTitle(data.title)
            setDesc(data.desc)
            setBody(data.body)
        }else{
            navigate(-1)
        }
    },[])
    let getFormattedDate=()=> {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = months[today.getMonth()];
        const year = today.getFullYear();

        return `${day} ${month} ${year}`;

    }
    let updateblog = async()=>{
        if(!title || !desc || !body || !blogid) {
            navigate(-1)
            return;
        }else if(!userid || !username){
            setLogin(false);
            return
        }else{
            try{
                let data = {
                    id:blogid,
                    title:title,
                    desc:desc,
                    body:body,
                    author:username,
                    authorId:userid,
                    timestamp:getFormattedDate()
                }
                let res = await axios.put(`http://localhost:5000/blogs/${blogid}`,data)
                navigate(`/blog/${blogid}`)
                
            }catch(e){
                setError("Try Agian Later")
                return;
            }
        }
    }
    return (
        <div className="createblog">
            {
                login && 
                <div className="content">
                    <h1>Update {blogid} Blog</h1>
                    <div className="form">
                        <label htmlFor="title">Blog Title :</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Blog Title ...'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <label htmlFor="desc">Blog Description :</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder='Blog Description ...'
                            rows={4}
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                        ></textarea>
                        <label htmlFor="body">Blog Body :</label>
                        <textarea
                            name="body"
                            id="body"
                            placeholder='Blog Body ...'
                            rows={14}
                            value={body}
                            onChange={(e) => { setBody(e.target.value) }}
                        ></textarea>
                        <button onClick={updateblog}>Update Blog</button>
                        <h5 className='errh3'>{error}</h5>
                    </div>
                </div>
            }
            {
                !login &&
                <div className="content">
                    <h1>To Create New Blog You Need To Login</h1>
                    <div className="right div">
                        <Link to={"/Login"} className='link l1'>Login</Link>
                        <Link to={"/Register" } className='link l2'>Register</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdateBlog