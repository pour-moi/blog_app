import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";

export function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelLogout = (e) => {
    const token = Cookies.get("accessToken");
    axios
      .post("http://localhost:8000/blog/logout", { token: token })
      .then((response) => {
        console.log(response);
        Cookies.remove("accessToken");
        location.reload();
      });
  };

  return (
    <>
      <div className="header">
        <h1>Blog</h1>
        <Link to="/post">
          <button className="write-blog">Write</button>
        </Link>
        <Link to="/login">
          <button onClick={handelLogout} className="logout">
            Logout
          </button>
        </Link>
      </div>
      <div className="blog-container">
        {blogs.map((blog, index) => {
          return (
            <Link
              key={blog.id}
              to={"/blog"}
              state={{ id: blog.id }}
              className="link"
            >
              <div className="blog">
                <img
                  src="https://i.pinimg.com/564x/fb/6a/38/fb6a3829931ef8642088e36c7bdd5a35.jpg"
                  alt=""
                />
                <div className="blog-title--content">
                  <h2 className="main-blog-title">{blog.title}</h2>
                  <p className="main-blog-content">
                    {blog.content.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        {/* <button>Post</button> */}
      </div>
    </>
  );
}
