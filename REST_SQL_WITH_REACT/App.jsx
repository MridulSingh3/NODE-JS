import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetPosts from './pages/GetPosts';
import AddPosts from './pages/AddPosts';
import ShowPosts from './pages/ShowPosts';
import EditPosts from './pages/EditPosts';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/posts" element={<GetPosts />} />
                    <Route path="/posts/add" element={<AddPosts />} />
                    <Route path="/posts/:id" element={<ShowPosts />} />
                    <Route path="/posts/:id/edit" element={<EditPosts />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
