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
  //navigate
  return (
    <div>
      <Routes>
        {/* 로그인 되어 있는 경우에만 Login 화면이 보이도록, 직접 주소 쳐서 들어오는 경우에도 Home으로 이동시킴, ※ 주소 쳐서 들어왔을 경우 login 화면 잠깐 보이는거 수정해야 함*/}
        {userObj === null ? <Route path='/' element={<Login />} /> : <Route path='/Home' element={<Home />} />}

        {userObj !== null ? <Route path='/Home' element={<Home />} /> : <Route path='/Home' element={""} />}

        {/* 수정해야함 */}
        {userObj &&
          <>
            <Route path='/Management' element={<Management />} />
            <Route path='/Payment' element={<Payment />} />
            <Route path='/MoveRequest' element={<MoveRequest />} />
            <Route path='/Breakdown' element={<Breakdown />} />
          </>
        }

      </Routes>
    </div>
  )
}

export default Router
