import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])


    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getByID(params.id)
        setPost(response.data)
    })
    const [fetchCom, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getComm(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCom(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста {params.id}</h1>
            {isLoading 
                ? <Loader></Loader>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isComLoading 
                ? <Loader></Loader>
                :   <div>
                        {comments.map(comm => 
                            <div key={comm.id} style={{marginBottom: '15px'}}>
                                {comm.email} <br />
                                {comm.body}
                            </div>
                        )}
                    </div>
            }
        </div>
    )
}

export default PostPage