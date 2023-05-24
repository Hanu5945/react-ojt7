import React from 'react'
import Pay from 'components/grid/Pay'
import { useState, useEffect } from 'react'
import { dbService } from 'fbase';
import PayChart from 'components/chart/PayChart'

function Payment() {
  const [payData, setPayDate] = useState([]); // 파이어베이스 pay 컬렉션 저장할 state
  console.log('Payment 컴포넌트', payData);

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

  return (
    <div>
      <div>결제내역</div>
      {payData &&<Pay payData={payData} />}
      {/* 차트 */}
      <div>
        <PayChart payData={payData} />
      </div>
    </div>
  )
}

export default Payment
