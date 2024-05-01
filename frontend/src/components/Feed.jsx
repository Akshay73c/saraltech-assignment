import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Assuming you use Axios for requests
import Postcard from '../Cards/Postcard';
import '../styles/Feed.css'


const Feed = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${userId}/posts`);
                setPosts(response.data.posts);
                // console.log(`UserId: ${userId}`)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="feed">
            {posts.length > 0
                ? posts.map((post) => (
                    <Postcard key={post.id} post={post} />
                ))

                : <h2>No posts</h2>}

        </div>
    );
};

export default Feed;
