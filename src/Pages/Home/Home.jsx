import React,{useState, useEffect} from 'react'
import "./style.css"

import Blog from '../../Components/Blog/Blog'
import axios from "axios"
function Home() {
    const [blogs, setBlogs] = useState();
    useEffect(()=>{
        const blogsFetch = async ()=>{
            try{
                let res = await axios.get("http://localhost:5000/blogs")
                setBlogs(res.data)
            }catch(e){
                console.log(e)
            }
            
        }
        blogsFetch()
    },[])
    return (
        <div className="home">
            {!blogs && <h3 className='errh3'>Blogs Fetching Error</h3>}
            {blogs && [...blogs].reverse().map((blog)=>(
                <Blog key={blog.id} id={blog.id} title={blog.title} desc={blog.desc} author={blog.author} timestamp={blog.timestamp}/>
            ))}
        </div>
    )
}

export default Home