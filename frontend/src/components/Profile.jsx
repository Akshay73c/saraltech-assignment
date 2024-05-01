import Feed from './Feed';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Profile.css'
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Profile() {
    const navigate = useNavigate()
    const { userId } = useParams()

    return (
        <>
            <div className='profile' >
                <h2>Hey user with id: {userId}</h2>
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
    const [authourEmail, setAuthourEmail] = useState('')

    useEffect(() => {

        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:3000/user/${userId}`)
            setAuthourEmail(response.data.email)
        }
        fetchUser()

    }, [authourEmail])

    const handleCreate = async () => {
        console.log(authourEmail)
        await axios.post(`http://localhost:3000/user/${userId}/post`, {
            title, content, authourEmail
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
