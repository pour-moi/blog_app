import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";

export default function Login() {
  const [user_data, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserData({ ...user_data, username: e.target.value });
  };

  const handlePassword = (e) => {
    setUserData({ ...user_data, password: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/blog/login", user_data)
      .then((response) => {
        if (response.data.is_authenticated) {
          Cookies.set("accessToken", response.data.accessToken);
          navigate("/home");
        } else navigate("/register");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <img
            src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=740&t=st=1721916127~exp=1721916727~hmac=3855970a1edaf8e1b1500ade32389d267bb7fe214458097f9877a94fae324282"
            alt=""
            className="login-image"
          />
          <form onSubmit={handleSubmit} autoComplete="off">
            <h1 style={{ color: "white" }}>Login</h1>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={user_data.username}
              onChange={handleUserName}
              className="login-username"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={user_data.password}
              onChange={handlePassword}
              className="login-password"
              required
            />
            <input type="submit" value="Login" className="login-button" />
          </form>
        </div>
      </div>
    </>
  );
}
