import React from 'react';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'fbase';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate(); // useNavigate 훅은 변수에 담아서 사용
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const onChange = (event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'password') {
            setPassword(event.target.value);
        } else {
            window.location.reload();
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('submit');
        try {
            await signInWithEmailAndPassword(authService, email, password);
            navigate('/Home');  // 로그인 성공시 Home으로 이동
        } catch (error) {
            console.log('error : ', error);
            setError(error.message)
        }
    }

    return (
        <div style={{ border: 'solid 1px black' }}>
            유저 정보 가져와서 있으면 로그인하지 않도록
            Login
            <form onSubmit={onSubmit}>
                <input placeholder='아이디' type='text' name='email' onChange={onChange} /><br />
                <input placeholder='비밀번호' type='password' name='password' onChange={onChange} />
                <button>로그인</button><br />
                {error}
            </form>
        </div>
    )
}

export default Login