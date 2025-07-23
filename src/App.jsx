import {Route, Routes} from "react-router-dom"
import React,{useState} from "react";
import Home from "./Pages/Home/Home";
import './App.css';
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Header from "./Components/Header/Header";
import Error from "./Pages/Error/Error";
import IdBlog from "./Pages/IdBlog/IdBlog";
import UserContext from "./Context/userContext";
import CreateBlog from "./Pages/CreateBlog/CreateBlog";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Blog/:blogid" element={<IdBlog />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
