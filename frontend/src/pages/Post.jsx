import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export default function WriteBlog() {
  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
    user_name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("user_name", localStorage.getItem("user_name"));
    if (data.image) formData.append("image", data.image);

    axios
      .post("http://127.0.0.1:8000/blog/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTitleChange = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setData({
      ...data,
      content: e.target.value,
      user_name: localStorage.getItem("user_name"),
    });
  };

  const handleImageChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
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
            required
          />
          <textarea
            name="blog_content"
            id=""
            placeholder="Write your text here..."
            value={data.content}
            onChange={handleContentChange}
            rows={15}
            className="post-content"
            required
          ></textarea>
          <div className="image-input">
            <label htmlFor="image">Image: </label>
            <input
              type="file"
              name=""
              id="Image"
              onChange={handleImageChange}
              className="input-image"
            />
            <input type="submit" value="Post" id="post" />
          </div>
        </form>
      </div>
    </>
  );
}
