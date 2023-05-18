import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from 'fbase.js';
import { useNavigate } from 'react-router-dom'

function Login() {
    // useNavigate 훅 : 페이지 이동 처리
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");

    // input에 입력되면 바뀌는 value값
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
            await signInWithEmailAndPassword(authService, email, pw);
            navigate('/Page2')  // 로그인 성공시 Page2로 이동
        } catch (error) {
            console.log("error", error);
            setError(error.message);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>ID </label><input type='text' placeholder='Email' name='email' onChange={onInputChange} value={email} /><br />
                <label>PW </label><input type='password' placeholder='PW' name='pw' onChange={onInputChange} value={pw} /><br />
                <button>로그인</button>
                <button><Link to='/Join'>회원가입하기</Link></button><br />
                {error}
            </form>
        </div>
    )
}

export default Login
