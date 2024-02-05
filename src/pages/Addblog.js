import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Addblog = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchallcats = async () => {
      const res = await axios.get(
        "http://localhost:9000/api/v1/get/allcategories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(res.data);
    };
    fetchallcats();
  }, []);

  //creating form data

  const formdata = new FormData();
  formdata.append("title", input.title);
  formdata.append("description", input.description);
  formdata.append("category", input.category);
  formdata.append("thumbnail", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/post/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <main className="my-5">
        <div className="container shadow">
          <h2 className="text-center my-3 ">Add a New Blog</h2>
          <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Blog Title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    value={input.category} // Add this line to control the select with React state
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {categories &&
                      categories.map((item) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={(e) =>
                      setInput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Blog description"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Select thumbnail"
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Add Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Addblog;
