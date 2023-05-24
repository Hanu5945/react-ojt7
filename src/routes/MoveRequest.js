import React, { useState, useEffect } from 'react'
import { dbService } from 'fbase';
import Move from 'components/grid/Move';
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
      <div>이동요청</div>
      <Move moveData={move} />
    </div>
  )
}

export default MoveRequest
