import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user";
import Edit from "./pages/Edit";
import AddUser from "./pages/AddUser";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/user/:id/edit" element={<Edit />} />
                    <Route path="/user/add" element={<AddUser />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
