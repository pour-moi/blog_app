import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  ButtonGroup,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import "./style.css";

export default function MyPost() {
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/blog/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/blog/delete/${id}`).then((response) => {
      console.log(response.data);
      location.reload();
    });
  };

  useEffect(() => {
    // Filter blogs based on user_name once data is fetched
    const user_name = localStorage.getItem("user_name");
    if (user_name) {
      const filteredBlogs = data.filter(
        (blog) => blog.author.username === user_name
      );
      setBlogs(filteredBlogs);
    }
  }, [data]); // This effect runs when 'data' is updated
  return (
    <>
      <h1>My Posts</h1>
      <div className="remaining-boxes-container">
        {blogs.map((blog) => (
          <div key={blog.id} className="card-container">
            <Link to={`/blog`} state={{ id: blog.id }} className="link">
              <Card
                className="card"
                sx={{
                  maxWidth: 345,
                  width: "400px",
                  height: "fit-content",
                  margin: "1em",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    className="home-page-image"
                    component="img"
                    height="140" // Adjust height as needed
                    image="https://i.pinimg.com/564x/fb/6a/38/fb6a3829931ef8642088e36c7bdd5a35.jpg"
                    alt={blog.title} // Use blog title or a descriptive text
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.content.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
            <CardActions>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
              >
                <Button color="primary">Update</Button>
                <Button onClick={(e) => handleDelete(e, blog.id)} color="error">
                  Delete
                </Button>
              </ButtonGroup>
            </CardActions>
          </div>
        ))}
      </div>
    </>
  );
}
