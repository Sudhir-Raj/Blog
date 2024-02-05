// rafce
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./pages/Header";
import Addblog from "./pages/Addblog";
import Addcategory from "./pages/Addcategory";
import Singleblog from "./pages/Singleblog";
import PrivateRoute from "./services/protectedroutes";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute/>}>
        <Route path="/blog/:id" element={<Singleblog />} />
        <Route path="/add-blog" element={<Addblog />} />
        <Route path="/add-category" element={<Addcategory />} />
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
