import axios from "axios";
import { useState } from "react";
import "./style.css";

export default function Register() {
  const [new_user, setNewUser] = useState({
    username: "",
    password: "",
  });

  const handelNewUser = (e) => {
    e.preventDefault();
    setNewUser({ ...new_user, username: e.target.value });
  };

  const handelNewPassword = (e) => {
    e.preventDefault();
    setNewUser({ ...new_user, password: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/blog/register", new_user)
      .then((response) => {
        console.log(response);
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
          <form onSubmit={handelSubmit} autoComplete="off">
            <h1 style={{ color: "white" }}>Register</h1>
            <input
              type="text"
              name="username"
              value={new_user.username}
              onChange={handelNewUser}
              placeholder="username"
              className="login-username"
              required
            />
            <input
              type="password"
              name="password"
              value={new_user.password}
              onChange={handelNewPassword}
              placeholder="password"
              className="login-password"
              required
            />
            <input type="submit" value="Submit" className="login-button" />
          </form>
        </div>
      </div>
    </>
  );
}
