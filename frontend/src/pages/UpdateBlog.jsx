import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

export default function UpdateBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || "";
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/blog/post/${id}`).then((response) => {
      setBlog({
        ...blog,
        title: response.data[0].title || "",
        content: response.data[0].content || "",
      });
    });
  }, [id]);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setBlog({ ...blog, title: e.target.value });
  };

  const handleContentChange = (e) => {
    e.preventDefault();
    setBlog({ ...blog, content: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/blog/update/${id}`, blog)
      .then((response) => {
        console.log("Blog updated:", response.data);
        // navigate(`/blog`);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  return (
    <>
      <div className="head">
        <h1>Update Blog</h1>
        <button className="save-button">
          <label htmlFor="save">Save</label>
        </button>
      </div>
      <div className="post-blog">
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="blog_title"
            placeholder="Title"
            value={blog.title}
            onChange={handleTitleChange}
            className="post-title"
            required
          />
          <textarea
            name="blog_content"
            id=""
            placeholder="Write your text here..."
            value={blog.content}
            onChange={handleContentChange}
            rows={15}
            className="post-content"
            required
          ></textarea>
          <input type="file" name="" id="" />
          <input type="submit" value="Save" id="save" />
        </form>
      </div>
    </>
  );
}
