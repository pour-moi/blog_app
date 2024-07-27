import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { state } = useLocation();

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
    axios.post("http://localhost:8000/blog/logout").then((response) => {
      Cookies.remove("accessToken");
      location.reload();
    });
  };

  return (
    <>
      <div className="header">
        <h1>Blog</h1>
        <div className="buttons">
          <Link to="/post">
            <button className="write-blog">Write</button>
          </Link>
          <Link to="/login">
            <button onClick={handelLogout} className="logout-button">
              Logout
            </button>
          </Link>
        </div>
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
                  <div className="display-user">
                    <img
                      src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                      alt=""
                      className="user-image"
                    />
                    <p className="author-name">{blog.author.username}</p>
                  </div>
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
