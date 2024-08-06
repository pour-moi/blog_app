import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
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
          <Dropdown>
            <MenuButton>My account</MenuButton>
            <Menu slots={{ listbox: AnimatedListbox }}>
              <Link to="/post">
                <MenuItem>Write</MenuItem>
              </Link>
              <Link to="/mypost">
                <MenuItem>My Post</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </Dropdown>
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
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
  `
);
