import React from 'react'
import Pay from 'components/grid/Pay'
import { useState, useEffect } from 'react'
import { dbService } from 'fbase';

function Payment() {
  const [payData, setPayDate] = useState([]); // 파이어베이스 pay 컬렉션 저장할 state

  useEffect(() => {
    dbService.collection('pay').onSnapshot(snap => {

      const payArray = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPayDate(payArray);
    })
  }, [])

  return (
    <div>
      <div>결제내역</div>
      <Pay payData={payData}/>
    </div>
  )
}

export default Payment
