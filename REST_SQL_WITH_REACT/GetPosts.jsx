import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");

        if (!confirmDelete) return;

        await fetch(`http://localhost:8080/posts/${id}`, {
            method: "DELETE"
        });

        navigate("/posts");
    };
    return (
        <div>
            <h1>Posts</h1>

            <a href="/posts/add">
                <button>Add Posts</button>
            </a>
            {
                posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.name}</h3>
                        <p>{post.post}</p>
                        <br />
                        <button onClick={() => navigate(`/posts/${post.id}`)}>Show Post</button>
                        <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit Post</button>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default GetPosts
