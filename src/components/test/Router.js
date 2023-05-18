import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'routes/test/Login.js'
import Join from 'routes/test/Join.js'
import Page2 from 'routes/test/Page2.js'

// isLoggedIn : true인 경우 => Page2를 보여줌
// isLoggedIn : false 경우  => 기존 화면을 보여줌
function Router({ isLoggedIn, userObj }) {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    {isLoggedIn ? null : <>
                        <Route path='/' element={<Login />} />
                        <Route path='/Join' element={<Join />} />
                    </>}
                    {userObj && <Route path='/Page2' element={<Page2 userObj={userObj} />} />}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router
