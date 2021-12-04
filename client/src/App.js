import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import Navbar from "./components/Navbar/Navbar"
import LoginForm from "./components/AuthForms/LoginForm"
import RegistrationForm from "./components/AuthForms/RegistrationForm"
import Main from "./Pages/Main/Main"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {refresh} from "./api/user"
import MyPosts from "./Pages/MyPosts/MyPosts"
import CreatePost from "./Pages/CreatePost/CreatePost"
import UpdatePost from "./Pages/UpdatePost/UpdatePost"
import {CREATE, LOGIN, MAIN, MY, REGISTRATION, UPDATE} from "./constants"

function App() {

    const isAuth = useSelector(store => store.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refresh())
    }, [])

    return (
        <BrowserRouter>
          <Navbar />
          {!isAuth ?
            <Routes>
                <Route path={LOGIN} element={<LoginForm />} />
                <Route path={REGISTRATION} element={<RegistrationForm />} />
                <Route path="*" element={<Navigate replace to={LOGIN} />} />
            </Routes>
           :
            <Routes>
              <Route path={MAIN} element={<Main />} />
              <Route path={MY} element={<MyPosts />} />
              <Route path={CREATE} element={<CreatePost />} />
              <Route path={UPDATE} element={<UpdatePost />} />
              <Route path="*" element={<Navigate replace to={MAIN} />} />
            </Routes>
          }
        </BrowserRouter>
    )
}

export default App
