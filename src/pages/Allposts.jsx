import React from 'react'
import { PostCard } from '../components'
import databaseservice from '../appwrite/Dbservice'
import { Container } from '../components'
import { useState } from 'react'
import { useEffect } from 'react'


function Allposts() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        databaseservice.getPosts([]).then((res)=>{
            if(res)
            {
                setPosts(res.documents)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {
                posts.map((post)=>(
                    <div className="p-2 w-1/4" key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))
            }
        </div>
      </Container>
    </div>
  )
}

export default Allposts
