import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddPosts = () => {
    const [name, setName] = useState('');
    const [post, setPost] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:8080/posts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                post: post
            })
        });

        console.log("Data sent ✅");
        navigate("/posts")
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input type="text"
                    placeholder="Enter name.."
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="post">Post</label><br />
                <input type="text"
                    placeholder="Enter post..."
                    name="post"
                    value={post}
                    onChange={(e) => setPost(e.target.value)} />
                <br />
                <button type="submit">Save</button>
            </form>

        </div>
    )
}

export default AddPosts
