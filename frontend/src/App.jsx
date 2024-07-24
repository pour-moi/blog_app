import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import WriteBlog from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="post" element={<WriteBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
