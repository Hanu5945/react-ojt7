import React, { useState, useEffect } from 'react'
import { dbService } from 'fbase';
import Move from 'components/grid/Move';
import MoveChart from 'components/chart/MoveChart';
import style from 'style/location.module.css'

function MoveRequest() {

  const [move, setMove] = useState([]); // 파이어베이스 move 컬렉션 저장

  // console.log('move', move);
  useEffect(() => {
    dbService.collection("move").onSnapshot(snapshot => {
      // console.log('snapshot.docs', snapshot.docs);

      const moveArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // sort 사용하여 오름차순
      moveArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
      setMove(moveArray);
    })
  }, [])
  // console.log('move', move);
  return (
    <div>
      <div className={style.location}><b>관리현황 - 이동요청 목록</b></div>
      <Move moveData={move} />

      {/* 데이터가 없으면 차트를 보여주지 않는다 */}
      {move.length >= 1 ?
        <MoveChart moveData={move} />
        : <div>No Data</div>}
    </div>
  )
}

export default MoveRequest
