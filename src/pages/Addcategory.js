import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Addcategory = () => {

  const navigate = useNavigate();

  const [input,setInput] = useState({
    title : "",
  });

  const handleaddcat = async(e)=>{
    e.preventDefault();
    try {

      const res = await axios.post(
      "http://localhost:9000/api/v1/post/addnewcategory",
             input,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
          
        );
        alert(res.data.message);
        navigate("/");
      
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>

     <main className="my-5">
      <div className="container shadow">
        <h2 className="text-center my-3">Add a New Category</h2>
        <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleaddcat}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e)=>{
                    setInput({
                      ...input,[e.target.name]:e.target.value
                    });
                  }}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Category Title"
                />
              </div>
              
                 <div className="mb-3">
                  <button type='submit' className='btn btn-primary'>
                    Add Category
                  </button>
                 </div>
            </form>
          </div>
        </div>
      </div>
     
      </main>
    </>
  )
}

export default Addcategory