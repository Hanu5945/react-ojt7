import React from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TestAdd from 'components/test/TestAdd'
import TestDlelet from 'components/test/TestDlelet'
import TestUpdate from 'components/test/TestUpdate'
import TestSelect from 'components/test/TestSelect'

function Page2({ userObj }) {
  // useNavigate 훅 : 페이징 이동 처리
  const navigate = useNavigate();

  // 로그아웃 이벤트
  const onLogOutClick = () => {
    // signOut 사용자 로그아웃을 처리
    authService.signOut();
    // navigate 사용 로그아웃시 '/' 로 이동
    navigate("/");
  }

  const [testText, setTestText] = useState([]);

  // useEffect 사용 데이터 렌더
  useEffect(() => {
    dbService.collection('test').onSnapshot(snapshot => {
      // snapshot : 데이터베이스가 변화될때마다 감지
      const testArray = snapshot.docs.map(doc => ({
        id: doc.id,    // 로그인한 user의 id를 가져옴
        ...doc.data(),  // data를 가져옴
      }))
      snapshot.docs.map(doc => console.log("doc__firestore", doc))
      setTestText(testArray); // user Id와 data들을 전부 가져옴
    })
  }, [])
  return (
    <div>
      {testText.map((item) =>
        <div key={item.now}>
          <TestSelect key={item.now} itemObj={item} />
          {/* 글쓴이와 로그인한 유저의 id가 같으면 Render*/}
          {item.creatorId === userObj.uid ? <TestDlelet item={item} /> : null}
          {item.creatorId === userObj.uid ? <TestUpdate item={item} /> : null}
        </div>
      )}
      <TestAdd userObj={userObj} />
      <br />
      <button onClick={onLogOutClick}> Log Out </button>
    </div>
  )
}

export default Page2
