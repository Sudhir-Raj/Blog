import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
   const username = localStorage.getItem("username");

   const handlelogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
   }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Sudhir
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-blog">
                  Add Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-category">
                  Add Category
                </Link>
              </li>
            </ul>
          </div>
          <div className="div-inline mx-auto my-2 my-lg-0">
             {token && token !== null ? 
             <>
                 <button className="btn btn-primary">Welcome: {username}</button>
                 <button onClick={handlelogout} className=" mx-3 btn btn-primary">Logout</button>
            </>
            :
            <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>

              <Link to="/register">
                <button className="mx-3 btn btn-primary">Register</button>
              </Link>
               </>
             }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
