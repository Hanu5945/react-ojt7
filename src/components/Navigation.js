import React from 'react';
import { Link } from 'react-router-dom';
import TapSpan from 'components/TapSpan';
function Navigation() {
    return (
        <nav>
            <Link to='/Management'> <TapSpan TapText={'관리현황'}/> </Link>
            <Link to='/Payment'> <TapSpan TapText={'결제내역'}/> </Link>
            <Link to='/MoveRequest'> <TapSpan TapText={'이동요청'}/> </Link>
            <Link to='/Breakdown'> <TapSpan TapText={'고장수집'}/> </Link>
        </nav>
    )
}

export default Navigation
