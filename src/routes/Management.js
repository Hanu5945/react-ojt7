import React from 'react';
import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Manage from 'components/grid/Manage'

function Management() {

  const [data, setDate] = useState([]);

  useEffect(() => {
    // snapshot : 데이터베이스가 변화할때마다 감지한다 (즉, collection 'manage'가 변화하면 감지)
    dbService.collection('manage').onSnapshot(snapshot => {
      console.log("snapshot docs : ", snapshot.docs);

      const dbData = snapshot.docs.map(doc => ({
        id: doc.id,     // 문서ID
        ...doc.data(),  // 데이터 ...사용하여 요소로 접근
      }))

      setDate(dbData);
    })
  }, [])

  return (
    <div>
      <div>관리현황</div>
      <div>
        {/* {data.map((item) => (
          <div key={item.id} style={{ border: '1px solid black' }}>
            {item.이동수단ID}<br />
            {item.좌표._lat}<br />
            {item.좌표._long}<br />
            {item.위치}<br />
            {item.상세위치}<br />
            {item.타입}<br />
            {item.연식}<br />
          </div>
        ))} */}
        <Manage item={data} />
      </div>
    </div>
  )
}

export default Management
