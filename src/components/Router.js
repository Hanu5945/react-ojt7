import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'routes/Login';
import Home from 'routes/Home';
import Management from 'routes/Management';
import Payment from 'routes/Payment';
import MoveRequest from 'routes/MoveRequest';
import Breakdown from 'routes/Breakdown';

function Router({ userObj }) {  // {} 사용하여 해당 요소로 직접 접근
  console.log('Router userObj', userObj);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />

        {userObj !== null ? <Route path='/Home' element={<Home />} /> : <Route path='/Home' element={""} />}

        <Route path='/Management' element={<Management />} />
        <Route path='/Payment' element={<Payment />} />
        <Route path='/MoveRequest' element={<MoveRequest />} />
        <Route path='/Breakdown' element={<Breakdown />} />
      </Routes>
    </div>
  )
}

export default Router
