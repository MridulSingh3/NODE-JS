import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        fetch(`http://localhost:9999/user/${id}`)
            .then(res => res.json())
            .then(data =>
                setForm({
                    username: data?.username || "",
                    password: ""
                })
            );
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:9999/user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        navigate("/user");
    };

    return (
        <div className="container">
            <form className="form-card" onSubmit={handleSubmit}>
                <h2>Edit User</h2>

                <input
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Enter old password"
                    onChange={handleChange}
                />

                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Edit;