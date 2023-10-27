import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider } from 'react-redux'
import store from './store/Store.js'
import {BrowserRouter, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Protection, Login} from './components/'
// import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/Allposts.jsx'
import Addpost from './pages/Addpost.jsx'
import Editpost from './pages/Editpost.jsx'
import Post from './pages/Post.jsx'



const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <Protection authentication={false}>
            <Login/>
          </Protection>
        )
      },
      {
        path: "/signup",
        element: (
            <Protection authentication={false}>
                <Signup/>
            </Protection>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <Protection authentication>
                {" "}
                <AllPosts />
            </Protection>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protection authentication>
                {" "}
                <Addpost />
            </Protection>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protection authentication>
                {" "}
                <Editpost />
            </Protection>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
