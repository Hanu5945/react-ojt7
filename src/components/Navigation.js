import React from 'react';
import { Link } from 'react-router-dom';
import Tapspan from 'components/TapSpan';
import logo from 'img/logo.png';
import style from 'style/nav.module.css';
import LogOut from 'components/LogOut';
function Navigation() {
    return (
        <nav className={style.container1}>
            <div className={style.navSpan}>
                <Link to='/Home'><Tapspan TapText={<img className={style.logo} src={logo} alt=""></img>} /> </Link>
            </div>
            <div className={style.container2}>
                <Link className={style.navTap} to='/Management'> <Tapspan TapText={'관리현황'} /> </Link>
                <Link className={style.navTap} to='/Payment'> <Tapspan TapText={'결제내역'} /> </Link>
                <Link className={style.navTap} to='/MoveRequest'> <Tapspan TapText={'이동요청'} /> </Link>
                <Link className={style.navTap} to='/Breakdown'> <Tapspan TapText={'고장신고'} /> </Link>
            </div><LogOut />
        </nav>
    )
}

export default Navigation
