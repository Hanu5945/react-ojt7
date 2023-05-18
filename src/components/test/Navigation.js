import React from 'react'
import { Link } from 'react-router-dom'

// 상단바 네비게이션 메뉴
function Navigation() {
    return (
        <nav>
            <Link to='/'> Login </Link>
            <Link to='/Join'> Join </Link>
            <Link to='/Page2'> Page2 </Link>
        </nav>
    )
}

export default Navigation
