import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";
import Naver from 'components/map/Naver';
import { dbService } from 'fbase';
import { collection, addDoc } from "firebase/firestore";

function Manage({ item }) {

  // 초기 데이터 상태
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = useState(initialDataState);   // 페이지와 페이지 크기 관련 상태 관리
  const [pageSizeValue, setPageSizeValue] = useState(); // 현재 선택된 페이지 크기 관리 (undefined로 설정한 이유 : 초기 렌더링 시에는 사용자가 크기를 선택하지 않았기 때문)

  // 페이지 변경 시 호출되는 콜백 함수
  const onPageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take = targetEvent.value === "All" ? item.length : event.page.take; // All인 경우 : data의 길이를 전부 보여줌, 아닌 경우 : 선택한 숫자만큼 보여줌
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);  // 페이지 크기를 변경할 때마다 렌더링
    }
    setPage({
      ...event.page,  // 선택한 페이지와 선택한 페이지 크기 관련 상태 관리
      take,           // 한 페이지에 보여줄 항목 수(위의 event에서 정의된 변수를 가져옴)
    });
  };


  const [clickData, setClickData] = useState(); // 클릭한 행의 데이터와 인덱스 저장
  const [open, setOpen] = useState(false);      // 팝업 열고 닫음 여부
  const [newData, setNewData] = useState('');   // 팝업용 데이터
  const [showInput, setShowInput] = useState(false);  // 보여줄 Input
  const [inputText, setInputText] = useState('');     // 보여줄 Input Text
  const [showBtn, setShowBtn] = useState(false);      // 보여줄 Btn
  const [showBtnText, setShowBtnText] = useState('');      // 보여줄 Btn

  const [inputData, setInputData] = useState('');     // input에 입력한 글
  // 행 클릭시 클릭한 행의 데이터 전달
  const onRowClick = (e) => {
    setClickData(e.dataItem);
  }

  // 더블클릭시 팝업 열기
  const openPopup = (e) => {
    setOpen(true);
    setNewData(e.dataItem);
  }

  // 팝업 닫기
  const closePopup = () => {
    setOpen(false)
    setShowInput(false) // 팝업을 닫으면서 false로 지정 (input 닫기)
    setShowBtn(false);  // 팝업을 닫으면서 false로 지정 (이동요청 고장신고 버튼 닫기)
  }

  // open은 동기적 문제로 false였으나 useEffect 사용하여 open이 바뀔때 실행 문제를 해결 )
  useEffect(() => {
    if (open) {
      let popup = document.querySelector('.popup');
      popup.style.display = 'block';
      popup.style.border = 'solid 3px black';
      popup.style.width = '300px';
      popup.style.height = '100px';
      popup.style.background = 'white';
      popup.style.position = 'relative';
      popup.style.bottom = '390px';
      popup.style.left = '51%';
    }
  }, [open]);  // open이 바뀌면 useEffect 감지


  let move = document.querySelector('.move');
  let breakdown = document.querySelector('.breakdown');
  let pay = document.querySelector('.pay');
  if (showInput === true) {
    if (move) {
      move.style.display = 'none';      // 이동, 고장 버튼 숨기기
    }
    if (breakdown) {
      breakdown.style.display = 'none';
    }
    if (pay) {
      pay.style.display = 'none';
    }
    console.log('if문 접근');
  }

  // 결제 버튼
  const onPay = () => {
    console.log('onPay 클릭');
    setShowInput(true);
    setInputText('결제금액');
    setShowBtn(true);
    setShowBtnText('결제');
  }

  // 이동 버튼
  const onMove = (e) => {
    console.log('onMove 클릭');
    setShowInput(true)
    setShowBtn(true)
    setInputText('이동 도착예정지를 입력해주세요.');
    setShowBtnText('이동');
  }
  // 고장 버튼
  const onBreakdown = () => {
    console.log('onBreakdown 클릭');
    setShowInput(true)
    setShowBtn(true)
    setInputText('고장 사유를 입력해주세요.');
    setShowBtnText('고장');
  }

  // input에 입력한 글 업데이트
  const onChange = useCallback((e) => {
    setInputData(e.target.value);
  }, []
  );


  const onSendData = async (e) => {
    console.log(' 버튼 클릭 ', e.target.name);
    // navigate('/MoveRequest', <MoveRequest test={test} />);
    if (e.target.name === '이동') {

      if (inputData.length > 1) {
        await addDoc(collection(dbService, "move"), {
          // await dbService.collection("nweets").add({
          createdAt: Date().substring(11, 24),  // 필요한 부분만 잘라서 add
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식 + '년',
          text: inputData
        });
        setInputData(""); //입력창 초기화
        alert(' 해당 데이터를 이동요청 하였습니다.');
        setOpen(false)
        setShowInput(false)
        setShowBtn(false)
        // ※ 공란체크도 필요
      } else if (inputData.length <= 1) {
        alert('이동 도착예정지를 입력해주세요.');
      }

    } else if (e.target.name === '고장') {

      if (inputData.length > 1) {
        await addDoc(collection(dbService, "break"), {
          // await dbService.collection("nweets").add({
          createdAt: Date().substring(0, 15),  // 필요한 부분만 잘라서 add
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식,
          text: inputData
        });
        setInputData(""); //입력창 초기화
        alert('해당 데이터를 이동 요청하였습니다.');
        setOpen(false)
        setShowInput(false)
        setShowBtn(false)
        // ※ 공란체크도 필요
      } else if (inputData.length <= 1) {
        alert('고장 신고 사유를 입력해 주세요.');
      }

    } else if (e.target.name === '결제') {

      if (inputData.length >= 4) {
        await addDoc(collection(dbService, "pay"), {
          // await dbService.collection("nweets").add({
          createdAt: Date().substring(11, 24),  // 필요한 부분만 잘라서 add
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식 + '년',
          text: inputData + '원'
        });
        setInputData(""); //입력창 초기화
        alert(' 결제내역을 추가하셨습니다.');
        setOpen(false)
        setShowInput(false)
        setShowBtn(false)

        // ※ 공란체크도 필요
      } else if (inputData.length < 4) {
        alert('결제내역을 입력해주세요.');
      }

    }


  }

  return (
    <>
      <Grid
        style={{ height: "400px" }}
        data={item.slice(page.skip, page.take + page.skip)} // 넣을 데이터 정보
        skip={page.skip}    // 처음 표시할 데이터의 인덱스
        take={page.take}    // 한 페이지에 보여줄 항목 수
        total={item.length} // 전체 데이터 항목 수 (그리드가 전체 데이터의 크기를 알고 페이징 처리를 할 수 있음)
        pageable={{
          buttonCount: 4, // 페이징 버튼 수
          pageSizes: [5, 10, 15, "All"], // 페이지 크기 선택 옵션
          pageSizeValue: pageSizeValue, // 초기 페이지 크기
        }}
        onPageChange={onPageChange}
        onRowClick={onRowClick}
        onRowDoubleClick={openPopup}
      >

        {/* field - 받은 데이터의 key값, title - 보여줄 컬럼명 */}
        <GridColumn field="이동수단ID" title="이동수단ID" />
        <GridColumn field="위치" title="위치" />
        <GridColumn field="상세위치" title="상세위치" />
        <GridColumn field="타입" title="타입" />
        <GridColumn field="연식" title="연식" />
      </Grid>
      <Naver item={item} clickData={clickData} />

      {open === true ?
        (<div className='popup' style={{ display: 'none' }}>
          <div onClick={closePopup}>X</div>
          선택한 이동수단ID : {newData.이동수단ID}<br />
          상세위치 : {newData.상세위치}<br />
          <button className='pay' onClick={onPay}> 결제 </button>
          <button className='move' onClick={onMove}> 이동 </button>
          <button className='breakdown' onClick={onBreakdown}> 고장 </button>
          {showInput && <input type="text" placeholder={inputText} value={inputData} onChange={onChange} />}
          {showBtn && <button onClick={onSendData} name={showBtnText}>{showBtnText}</button>}


          <select name="name" id="id">
            <option value="">이동 요청 : 대여소 정보 목록</option>
            <option value="dog">무역전시관입구</option>
            <option value="cat">대전컨벤션센터</option>
            <option value="hamster">한밭수목원</option>
            <option value="parrot">정부청사 입구</option>
            <option value="spider">대전시청</option>
            <option value="goldfish">엑스포과학공원</option>
          </select>

          <select name="name" id="id">
            <option value="">고장 신고 : 고장 사유 목록</option>
            <option value="dog">단말기 고장</option>
            <option value="cat">브레이크 고장</option>
            <option value="hamster">체인 체결 불량</option>
            <option value="parrot">타이어 펑크</option>
            <option value="spider">페달 고장</option>
            <option value="goldfish">기타</option>
          </select>
        </div >) : ""
      }
    </>
  );
}

export default Manage