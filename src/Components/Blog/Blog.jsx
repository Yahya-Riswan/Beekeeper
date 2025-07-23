import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
function Blog({id,title,desc,author,timestamp}) {
  return (
    <div  className="blog">
        <div className="content">
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
        <div className="extras">
            <div className="left">
                <h5>-By {author}</h5>
                <h5>{timestamp}</h5>
            </div>
            <div className="right">
                <Link to={`/Blog/${id}`} className='link'>Read More ...</Link>
            </div>
        </div>
    </div>
  )
}

export default Blog