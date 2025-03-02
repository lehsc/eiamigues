import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index.tsx"
export default function ReactRouter() {
    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        </Routes>
        </BrowserRouter>
    );
}