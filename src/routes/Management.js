import React from 'react';
import { useState, useEffect } from 'react';
import { dbService } from 'fbase';
// import { collection, addDoc } from "firebase/firestore";
import Manage from 'components/grid/Manage'
import style from 'style/location.module.css'

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

      // sort 사용하여 오름차순
      dbData.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));

      setDate(dbData);
    })
  }, [])



  // // 임시 데이터 추가 하는 곳
  // // let maxLng = data.length; // 임시데이터
  // const [d1, setD1] = useState('');
  // const [d2, setD2] = useState('대전광역시');
  // const [d3, setD3] = useState('');
  // const [d4, setD4] = useState('');
  // const [d5, setD5] = useState('');
  // const [d6, setD6] = useState('');
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await addDoc(collection(dbService, 'manage'), {
  //     createdAt: Date().substring(11, 24),  // 필요한 부분만 잘라서 add
  //     이동수단ID: d1,
  //     위치: d2,
  //     상세위치: d3,
  //     좌표: d4,
  //     연식: d5 + '년',
  //     타입: d6
  //   })
  //   alert('추가완료');

  //   setD1('');
  //   setD2('대전광역시');
  //   setD3('');
  //   setD4('');
  //   setD5('');
  //   setD6('');
  // }

  // const onChange = (e) => {
  //   console.log('값', e.target.value);
  //   if (e.target.name === 'd1') {
  //     setD1(e.target.value); // 일단 고정박아놓음
  //     console.log(e.target.value);
  //   } else if (e.target.name === 'd2') {
  //     setD2(e.target.value);      // 일단 고정박아놓음
  //   } else if (e.target.name === 'd3') {
  //     setD3(e.target.value);
  //   } else if (e.target.name === 'd4') {
  //     setD4(e.target.value);
  //   } else if (e.target.name === 'd5') {
  //     setD5(e.target.value);
  //   } else if (e.target.name === 'd6') {
  //     setD6(e.target.value);
  //   }

  // }

  return (
    <div>
      <div>
        <div>
          <div className={style.location}><b>관리현황 - 이동수단 목록</b></div>
          <Manage manageDate={data} />
          {/* data가 있을때만 실행
            (삼항연산자 사용하여 item이 있을때만 실행)
        */}
        </div>
        {/* 임시데이터추가 */}
        {/* <form onSubmit={onSubmit}>
          <h3>데이터 추가</h3>
          <label style={{ margin: '0px 0px 0px 0px' }}> 이동수단ID : </label><input placeholder='이동수단ID' name='d1' value={d1} onChange={onChange} /><br />
          <label style={{ margin: '0px 50px 0px 0px' }}>위치 : </label><input placeholder='위치' type='string' name='d2' value={d2} onChange={onChange} /><br />
          <label style={{ margin: '0px 20px 0px 0px' }}>상세위치 : </label><input placeholder='상세위치' type='string' name='d3' value={d3} onChange={onChange} /><br />
          <label style={{ margin: '0px 50px 0px 0px' }}>좌표 : </label><input placeholder='좌표' name='d4' value={d4} onChange={onChange} /><br />
          <label style={{ margin: '0px 50px 0px 0px' }}>연식 : </label><input placeholder='연식' type='string' name='d5' value={d5} onChange={onChange} /><br />
          <label style={{ margin: '0px 50px 0px 0px' }}>타입 : </label><input placeholder='타입' type='string' name='d6' value={d6} onChange={onChange} /><br />
          <button> 추가 </button>
        </form> */}
      </div>
    </div>
  )
}

export default Management
