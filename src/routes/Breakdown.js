import React, { useState, useEffect } from 'react'
import Break from 'components/grid/Break';
import { dbService } from 'fbase';

function Breakdown() {
  const [breakData, setBreakData] = useState([]); // 파이어베이스 break 컬렉션 저장

  useEffect(() => {
    dbService.collection('break').onSnapshot(snapshot => {
      const breakArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setBreakData(breakArray);
    })
  }, [])
  console.log('breakData', breakData);
  return (
    <div>
      고장신고
      <div><Break breakData={breakData}/></div>
    </div>
  )
}

export default Breakdown
