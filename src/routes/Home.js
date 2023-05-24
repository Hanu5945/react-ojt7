import React from 'react';
// import Line2 from 'components/line/Line2';
// import Line from 'components/line/Line';
// import Area from 'components/area/Area';
// import BdPie from 'components/pie/BdPie';
// import PayChart from 'components/chart/PayChart'
// import Data from 'components/Data'
// import Payment from 'routes/Payment'
import PayChart from 'components/chart/PayChart';
// import BdPie from 'components/pie/BdPie';
import { useState, useEffect } from 'react'
import { dbService } from 'fbase';
function Home() {
    const [payData, setPayDate] = useState([]); // 파이어베이스 pay 컬렉션 저장할 state

    useEffect(() => {
      dbService.collection('pay').onSnapshot(snap => {

        const payArray = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()

        }))
        // sort 사용하여 오름차순
        payArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
        setPayDate(payArray);
      })
    }, [])
    console.log('Home', payData);
    return (
        <div>
            {/* <Line />
            <Line2 />
            <Area /> */}
            Home
            {/* Home 2023 05 23 - 해야할 일 <br />
            1. 결제내역 페이지 <br />
            2. Home에 kendoUI활용 <br />
            3. 각각 네개의 컴포넌트로 나누기
            4. 그림이 그려지는 것만 우선 추출 <br />
            5. 스켈레톤 틀 완성 후 선임님께 피드백 받기 */}
            {/* <PayChart/> 안되는 이유? 전달하는 props가 없어서? 재사용 못하는지?*/}
            {/* <PayChart/>
            <BdPie {}/> */}
            {/* <Payment payData={payData}/> */}
            {/* <Data/> */}
            <PayChart payData={payData}/>
            {/* <BdPie breakData={payData}/> */}
        </div>
    )
}

export default Home
