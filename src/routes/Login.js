import React from 'react';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'fbase';
import { useState } from 'react';
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import logo from 'img/logo.png';
import Characters from 'img/char.png';
import style from 'style/login.module.css';

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
        <>
            <div className={style.container1} >
                <div className={style.container2}>
                <a href='http://www.neighbor21.co.kr/main'><img className={style.logo} src={logo} alt=""></img></a>
                </div>

                <div className={style.container3}>
                    <div className={style.container4}>
                        <h1 className={style.container6}>OJT 7차 이동수단 관리 웹 페이지</h1>
                        <div className={style.container7}>
                            <b className={style.b}>아이디 발급은 관리자에게 문의해주세요.</b><br />
                            <form onSubmit={onSubmit}>
                                <div className={style.container8}>
                                    <div className={style.input2}>
                                        <Input className={style.input} placeholder='Email' type='text' name='email' value={email} onChange={onChange} /><br />
                                        <Input className={style.input1} placeholder='Password' type='password' name='password' value={password} onChange={onChange} />
                                    </div>
                                        <Button className={style.button}>로그인</Button><br />
                                    <div className={style.error}> {error.substring(9)}</div>
                                </div>
                            </form >
                        </div>
                    </div>
                    <div className={style.container5}><img className={style.Characters} src={Characters} alt=""></img></div>
                </div >
            </div >
        </>
    )
}

export default Login