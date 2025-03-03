import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index.tsx"
import UserHome from "./pages/user/Index.tsx";
export default function ReactRouter() {
    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/user" element={<UserHome/>}/>
        </Routes>
        </BrowserRouter>
    );
}