import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import databaseservice from '../appwrite/Dbservice'
import { Container } from '../components/'
import { PostCard } from '../components'



function Home() {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        databaseservice.getPosts().then((res)=>{
            console.log(res);
            if(res)
            {
                setPosts(res.documents);
            }
        })
    },[])

  if(posts.length===0)
  {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full ">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts.
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return(
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div className="p-2 w-1/4" key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home
