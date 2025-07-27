import "./App.css";
import Home from "./components/Home/Home.tsx";
import Login from "./components/Login/Login.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./components/News/News.tsx";
//import { TodoListContext } from "./store/to-do-list-context.tsx";
//import { useContext } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/News" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
