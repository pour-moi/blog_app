import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function Blog() {
  const [blog, setBlog] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blog/post/${location.state.id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {blog.map((blog_to_read, index) => {
        return (
          <div key={index} className="blog_to_read">
            <h1>{blog_to_read.title}</h1>
            <p>{blog_to_read.content}</p>
          </div>
        );
      })}
    </>
  );
}
