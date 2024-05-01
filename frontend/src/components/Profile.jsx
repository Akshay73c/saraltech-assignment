import Feed from './Feed';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Profile.css'
import axios from 'axios';
import { useState } from 'react';


export default function Profile() {
    const navigate = useNavigate()
    const { userId } = useParams()

    return (
        <>
            <div className='profile' >
                <h2>{userId}</h2>
                <button onClick={() => { navigate('/signin') }}>Go Back</button>
            </div>

            <div className='feed-part'>
                <CreatePost userId={userId} />

                <Feed userId={userId} />
            </div>


        </>
    )

};


function CreatePost({ userId }) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleCreate = async () => {
        await axios.post(`http://localhost:3000/user/${userId}/post`, {
            title, content, authourEmail: "user3.test@gmail.com"
        }).then((response) => {
            console.log("created post")
        }).catch((err) => {
            console.log("err")
        })
    }

    return (
        <div className="create-post">
            <h2>Create Post</h2>
            <form onSubmit={handleCreate}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content">Content:</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}
