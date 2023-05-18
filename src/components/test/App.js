import React from 'react'
import Router from './Router.js'
import { authService } from 'fbase.js';
import { useEffect, useState } from 'react'

function App() {
  // 사용자의 로그인 상태 (true : 로그인, false : 비로그인)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // user 정보가 들어가 있음
  const [userObj, setUserObj] = useState(null);
  // console.log("userObj : ", userObj);

  // useEffect를 사용하여 한번만 실행
  useEffect(() => {
    // onAuthStateChanged : 로그인, 로그아웃, 어플리케이션이 초기화 할때 발생
    // 회원가입 or 로그인 => user가 생성
    authService.onAuthStateChanged((user) => {
      // user가 있으면
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user);
      } else {
        setIsLoggedIn(false)
      }
    });
  }, [])

  // console.log("userObj : ", userObj);
  // console.log("isLoggedIn : ", isLoggedIn);
  return (
    <div>
      {/* isLoggedIn을 props 전달 => 화면에 보여줄 Router를 정의 */}
      <Router isLoggedIn={isLoggedIn} userObj={userObj}/>
    </div>
  )
}

export default App
