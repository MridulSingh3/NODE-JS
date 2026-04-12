import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:9999/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        navigate("/user");
    };

    return (
        <div className="container">
            <form className="form-card" onSubmit={handleSubmit}>
                <h2>Add User</h2>

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                />

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;