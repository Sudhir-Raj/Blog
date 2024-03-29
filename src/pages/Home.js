import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [blogs,setBlogs] = useState([]);
  

  useEffect(()=>{
    
     const fetchallblogs = async ()=>{
      
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs",
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      // console.log("fetch", res.data);
      setBlogs(res.data);

     };
       fetchallblogs();

  },[]);

   const deleteBlog = async(blogId)=>{
       
      try {
          // console.log(localStorage.getItem("token"));
        const res = await axios.delete("http://localhost:9000/api/v1/delete/blog",{
          data: { id: blogId }, // Send the ID within the data object
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        );
        
        const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
        setBlogs(updatedBlogs);
        
      } catch (error) {
      alert(error.response.data.message);
        
        
      }
        
   }


  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>
            <div className="row">
              {blogs.length > 0 ? 
              
              blogs.map((item)=>{
               
                return(
                  <div key={item._id} className="col-lg-4 col-md-12 mb-4">
                <div className="card">
                  <div
                    className="bg-image hover overlay ripple"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={`http://localhost:9000/${item.thumbnail}`} 
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </a>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h5 className="mx-5 card-title">{item.category}</h5>

                    <p className="card-text">{item.description}</p>
                    <Link to={`/blog/${item._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                    <button onClick={() => deleteBlog(item._id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
                )
              })
            
            : <h2>No Blogs</h2>  
            }
              
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-secondary text-lg-start">
        <div
          className="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          2022 Copyright:
          <a className="text-white mx-2" href="https://mdbootstrap.com/">
            Sudhir-Raj
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
