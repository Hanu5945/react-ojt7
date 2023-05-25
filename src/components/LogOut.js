import React from 'react'
import { authService } from 'fbase'
import { useNavigate } from 'react-router-dom'
import { Button } from "@progress/kendo-react-buttons";
import style from 'style/logout.module.css'
function LogOut() {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        // signOut 사용자 로그아웃을 처리
        authService.signOut();
        // navigate 사용해 / 로 이동
        navigate("/");
    }
    return (
        < >
            <div onClick={onLogOutClick}  > <Button className={style.logout}>로그아웃</Button> </div>
        </>
    )
}

export default LogOut
