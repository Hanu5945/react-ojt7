import React from 'react';
import { Link } from 'react-router-dom';
import Tapspan from 'components/TapSpan';
function Navigation() {
    return (
        <nav>
            <Link to='/Home'> <Tapspan TapText={'Home'}/> </Link>
            <Link to='/Management'> <Tapspan TapText={'관리현황'}/> </Link>
            <Link to='/Payment'> <Tapspan TapText={'결제내역'}/> </Link>
            <Link to='/MoveRequest'> <Tapspan TapText={'이동요청'}/> </Link>
            <Link to='/Breakdown'> <Tapspan TapText={'고장수집'}/> </Link> 
        </nav>
    )
}

export default Navigation
