import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const EditPosts = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [post, setPost] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setPost(data.post);
            })
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:8080/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                post
            })
        });
        navigate(`/posts`);
    };
    return (
        <div>
            <h1>Edit Post</h1>

            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />

                <input
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Post"
                />

                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditPosts
