import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  return (
    <>
      <h1>Blog</h1>
      <div className="blog-container">
        {blogs.map((blog, index) => {
          return (
            <Link
              key={blog.id}
              to={"blogs"}
              state={{ id: blog.id }}
              className="link"
            >
              <div className="blog">
                <img src="" alt="" />
                <h2>{blog.title}</h2>
                <p>{blog.content.substring(0, 100)}...</p>
              </div>
            </Link>
          );
        })}
        {/* <button>Post</button> */}
      </div>
    </>
  );
}
