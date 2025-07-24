import React from 'react'
import {Link} from "react-router-dom"
import "./style.css"

function BlogData({id,title,update,remove}) {
  return (
    <div className="blogdata">
        <h4>{id}</h4>
        <h3>{title}</h3>
        <div className="button">
            <Link to={`/blog/${id}`} className='view'><i className="fa-solid fa-eye"></i></Link>
            <button className='edit' onClick={update}><i className="fa-solid fa-pen-to-square"></i></button>
            <button className='delete' onClick={remove}><i className="fa-solid fa-trash"></i></button>
        </div>
    </div>
  )
}

export default BlogData