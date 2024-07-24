import axios from "axios";
import { useState } from "react";
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
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="username"
          value={new_user.username}
          onChange={handelNewUser}
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password"
          value={new_user.password}
          onChange={handelNewPassword}
          placeholder="password"
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
