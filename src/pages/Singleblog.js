import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Singleblog = () => {
  
  const {id} = useParams();
  const [blog,setBlog] = useState([]);

   useEffect(()=>{
    
      const fetchsingleblog = async ()=>{
            const res = await axios.get(
            `http://localhost:9000/api/v1/get/blog/${id}`,
            { headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            });
            setBlog(res.data);
      }
       fetchsingleblog();

  },[id]);
   

  return (
    <>
    <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
          <h1 className="my-3">{blog.title}</h1>    
          <img
         src={`http://localhost:9000/${blog.thumbnail}`} 
         className="img img-responsive img-rounded my-3"
          />
          <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <Link to={"/"} className="btn btn-primary">
                      Back to posts
                    </Link>
      </div>
    </>
  )
}

export default Singleblog