import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom";

const ShowPosts = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8080/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("DATA:", data);
                setPost(data);
            });
    }, [id]);
    if (!post) return <h2>Loading...</h2>;
    return (
        <div>
            <h1>Show Post</h1>
            <br />
            {
                <div key={post.id}>
                    <h3>id: {post.id}</h3>
                    <br />
                    <h2>Name: {post.name}</h2>
                    <br />
                    <i>post: {post.post}</i>
                </div>
            }
        </div>
    )
}

export default ShowPosts
