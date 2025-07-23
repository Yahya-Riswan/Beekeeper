import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style.css"
function IdBlog() {
  const { blogid } = useParams();
  const [blogdata, setBlogData] = useState(null)
  useEffect(()=>{
      if(!blogdata){
          const fetchBlogData = async ()=>{
          try{
            let res1 = await axios.get(`http://localhost:5000/blogs/${blogid}`)
            setBlogData(res1.data)
          }catch(e){
            console.log(e)
          }
        }
        fetchBlogData()
      }

  },[blogid,blogdata])
  return (
    <div className='idblog'>
      {blogdata && 
        <div className="content">
          <h1>{blogdata.title}</h1><br/><br/>
          <h4>{blogdata.desc}</h4><br/><br/>
          <p>{blogdata.body}</p><br/><br/>

          <div className="extras">
            <div className="left">
              <h5>-by <Link to={`/users/${blogdata.authorId}`}>{blogdata.author}</Link></h5>
              <h5>{blogdata.timestamp}</h5>
            </div>
            <div className="right">
                <Link to={"/"} className='link'>Back</Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default IdBlog 