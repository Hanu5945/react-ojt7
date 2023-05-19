import React from 'react';
import { useEffect, useState } from 'react'
import Router from 'components/Router';
import { authService } from 'fbase';
import { BrowserRouter } from 'react-router-dom';
import LogOut from 'components/LogOut';
import Navigation from 'components/Navigation';


function Ojt() {
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {  // 로그인시 user 생성
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
    })
  }, [])

  return (
    <div>
      <BrowserRouter>
        <header>{userObj && <><Navigation /><LogOut /></>}</header>
        <Router userObj={userObj} />
        <footer></footer>
      </BrowserRouter>
    </div>
  )
}

export default Ojt
