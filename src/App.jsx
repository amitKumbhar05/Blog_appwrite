import { useState , useEffect } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authservices from './appwrite/Auth';
import { login, logout } from './store/authSlice';
import {Footer,Header} from '../src/components'
import {Outlet} from 'react-router-dom'


function App() {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)


  useEffect(()=>{
    authservices.getCurrentUser()
    .then((DATA)=>{
      if(DATA)
      {
        dispatch(login({DATA}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch(()=>console.error())
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading? (
    <div className='min-h-screen flex content-between flex-wrap'>
      <div className='w-full block'>
        <Header/>
        <main>
           <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null

}

export default App
