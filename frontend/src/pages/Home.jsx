import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";

export default function Home() {
  const baseURL = "http://127.0.0.1:8000/blog";

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    const token = Cookies.get("accessToken");
    axios.post("http://localhost:8000/blog/logout").then(() => {
      Cookies.remove("accessToken");
      window.location.reload();
    });
  };

  return (
    <>
      <div className="header">
        <h1>
          <FontAwesomeIcon icon={faBlog} />
        </h1>
        <div className="buttons">
          <div className="search">
            <input
              type="search"
              name="search-blog"
              className="search-bar"
              placeholder="Search"
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <Link to="/post">
            <button className="write-blog">Write</button>
          </Link>
          <Link to="/mypost">
            <button className="my-blog-button">My Post</button>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="blog-container">
        <div className="first-blog-container">
          {blogs.slice(0, 1).map((blog) => (
            <Link
              key={blog.id}
              to={"/blog"}
              state={{ id: blog.id }}
              className="link"
            >
              <div className="first-blog">
                <img
                  src="https://i.pinimg.com/564x/fb/6a/38/fb6a3829931ef8642088e36c7bdd5a35.jpg"
                  alt=""
                  className="home-page-image first-image"
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
          ))}
        </div>
        <div className="small-boxes-container">
          {blogs.slice(1, 4).map((blog) => (
            <Link
              key={blog.id}
              to={"/blog"}
              state={{ id: blog.id }}
              className="link"
            >
              <div className="ss-blog-container">
                <div className="blog">
                  <img
                    src="https://i.pinimg.com/564x/fb/6a/38/fb6a3829931ef8642088e36c7bdd5a35.jpg"
                    alt=""
                    className="home-page-image"
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
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="remaining-boxes-container">
        {blogs.slice(4).map((blog) => (
          <Link
            key={blog.id}
            to={"/blog"}
            state={{ id: blog.id }}
            className="link"
          >
            <div className="remaining-blog-container">
              <div className="other-blogs">
                <img
                  src={`${baseURL}${blog.image}`}
                  alt=""
                  className="home-page-image others-image"
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
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
