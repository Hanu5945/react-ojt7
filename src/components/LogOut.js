import React from 'react'
import { authService } from 'fbase'
import { useNavigate } from 'react-router-dom'

function LogOut() {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        // signOut 사용자 로그아웃을 처리
        authService.signOut();
        // navigate 사용해 / 로 이동
        navigate("/");
    }
    return (
        <div>
            <button onClick={onLogOutClick}> 로그아웃 </button>
        </div>
    )
}

export default LogOut
