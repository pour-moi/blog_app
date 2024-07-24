import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function WriteBlog() {
  const [data, setData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/blog/post", data).catch((error) => {
      console.log(error);
    });
    navigate("/");
  };

  const handleTitleChange = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setData({ ...data, content: e.target.value });
  };

  return (
    <>
      <div className="head">
        <h1>Blog</h1>
        <button className="post-button">
          <label htmlFor="post">Post</label>
        </button>
      </div>
      <div className="post-blog">
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="blog_title"
            placeholder="Title"
            value={data.title}
            onChange={handleTitleChange}
            className="post-title"
          />
          <textarea
            name="blog_content"
            id=""
            placeholder="Write your text here..."
            value={data.content}
            onChange={handleContentChange}
            rows={15}
            className="post-content"
          ></textarea>
          <input type="submit" value="Post" id="post" />
        </form>
      </div>
    </>
  );
}
