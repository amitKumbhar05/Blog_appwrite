import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protection ({children,authentication=true}) {
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    useEffect(()=>{
        if(authentication && authentication!==authStatus)
        {
            navigate('/login')
        }
        else if(!authentication && authentication!==authStatus)
        {
            navigate('/')
        }
        setLoader(false)
    },[navigate,authStatus,authentication])
  return loader ? (<h1>Loading.....</h1>): (<>{children}</>)
}

