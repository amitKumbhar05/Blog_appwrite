import React from 'react'
import { Container, PostForm } from '../components'
import databaseservice from '../appwrite/Dbservice'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function Editpost() {
    const [posts,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        if(slug)
        {
            databaseservice.getPost(slug).then((post)=>{
                if(post)
                {
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])

  return posts ? (
    <div className="py-8">
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null
}

export default Editpost
