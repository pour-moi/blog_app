import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          navigate("/");
        } else navigate("/register");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user_data.username}
          onChange={handleUserName}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user_data.password}
          onChange={handlePassword}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
