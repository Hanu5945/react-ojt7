import React, { useState, useEffect } from 'react'
import Break from 'components/grid/Break';
import { dbService } from 'fbase';
import BdPie from 'components/pie/BdPie'

function Breakdown() {
  const [breakData, setBreakData] = useState([]); // 파이어베이스 break 컬렉션 저장

  useEffect(() => {
    dbService.collection('break').onSnapshot(snapshot => {
      const breakArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // sort 사용하여 오름차순
      breakArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
      setBreakData(breakArray);
    })
  }, [])
  console.log('breakData', breakData);
  return (
    <div>
      고장신고
      {/* 그리드 */}
      <div><Break breakData={breakData}/></div>
      {/* kendoUI Pie */}
      <div><BdPie breakData={breakData}/></div>
    </div>
  )
}

export default Breakdown
