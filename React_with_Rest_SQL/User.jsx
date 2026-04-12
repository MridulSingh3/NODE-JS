import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        fetch("http://localhost:9999/user")
            .then(res => res.json())
            .then(data => setUsers(data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:9999/user/${id}`, {
            method: "DELETE",
        });

        fetchUsers();
    }

    return (
        <div className="user-container">
            <div className="header">
                <h2>User List</h2>
                <button onClick={() => navigate("/user/add")} className="add-btn">
                    + Add User
                </button>
            </div>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <Link to={`/user/${user.id}/edit`} className="edit-btn">
                                        ✏️ Edit
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="delete-btn"
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;