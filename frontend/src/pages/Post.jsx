import { useState, useEffect } from "react";
import axios from "axios";
export default function WriteBlog() {
  const [data, setData] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/blog/post", data)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTitleChange = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setData({ ...data, content: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="blog_title"
          placeholder="Title"
          value={data.title}
          onChange={handleTitleChange}
        />
        <textarea
          name="blog_content"
          id=""
          placeholder="Write your text here..."
          value={data.content}
          onChange={handleContentChange}
        ></textarea>
        <input type="submit" value="Post" />
      </form>
    </>
  );
}
