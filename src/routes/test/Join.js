import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from 'fbase.js';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Join() {
  // useNavigate 훅 : 페이지 이동 처리
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const onInputChange = (e) => {
    // 해당 타겟의 name을 비교하여 useState set 정의
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'pw') {
      setPw(e.target.value);
    }
  }
  // async 비동기 함수로 선언 await가 완료될때까지 실행되지 않는다
  const onSubmit = async (e) => {
    e.preventDefault(); // form submit 이벤트 중지
    try {
      let member;
      member = await createUserWithEmailAndPassword(authService, email, pw);
      navigate('/Page2'); // 회원가입 성공시 Page2로 이동
    } catch (error) {
      console.log("error", error);
      setError(error.message);  // 회원가입 실패시 에러 메세지
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email </label><input placeholder='Email' type='text' name='email' value={email} onChange={onInputChange} /><br />
        <label>PW </label><input placeholder='PW' type='password' name='pw' value={pw} onChange={onInputChange} /><br />
        <button text="회원가입"> 회원가입 </button><br />
        {error}
      </form>
    </div>
  )
}

export default Join
