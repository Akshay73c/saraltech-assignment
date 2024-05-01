import axios from 'axios';
import React from 'react';
import '../styles/Postcard.css'

const Postcard = ({ post }) => {
    // console.log(post)

    const deletePost = async () => {
        await axios.delete(`http://localhost:3000/post/${post.id}`)
            .then(() => {

            })
    }

    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={deletePost}>Delete</button>
        </div>
    );
};

export default Postcard;
