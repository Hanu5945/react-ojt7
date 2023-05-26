import React, { useState, useEffect } from 'react'
import Break from 'components/grid/Break';
import { dbService } from 'fbase';
import BdChart from 'components/chart/BdChart'
import style from 'style/location.module.css'

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

  return (
    <div>
      <div className={style.location}><b>관리현황 - 고장신고 목록</b></div>
      {/* 그리드 */}
      <div><Break breakData={breakData} /></div>
      {/* kendoUI Pie */}

      {/* 데이터가 없으면 차트를 보여주지 않는다 */}
      {breakData.length >= 1 ?
        <BdChart breakData={breakData} />
        : <div>No Data</div>}
    </div>
  )
}

export default Breakdown
