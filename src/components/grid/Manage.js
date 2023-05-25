import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";
import Naver from 'components/map/Naver';
import { dbService } from 'fbase';
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from '@progress/kendo-react-dropdowns';


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


  const [clickData, setClickData] = useState();              // 클릭한 행의 데이터 저장
  const [open, setOpen] = useState(false);                   // 팝업 on off
  const [newData, setNewData] = useState('');                // 팝업용 데이터 (팝업 데이터를 남기기 위해 사용)
  const [showInput, setShowInput] = useState(false);         // 팝업   Input
  const [inputText, setInputText] = useState('');            // 팝업   Input Text (placeholder)
  const [showBtn, setShowBtn] = useState(false);             // 팝업   Btn
  const [showBtnText, setShowBtnText] = useState('');        // 팝업   BtnText
  const [inputData, setInputData] = useState('');            // input에 입력한 글

  const [dropData, setDropData] = useState("도착예정지 목록");
  const [dropData2, setDropData2] = useState("고장신고 : 고장사유 목록");
  const [showDropDownList, setShowDropDownList] = useState(false);       // 팝업   Drop
  const [showDropDownList2, setShowDropDownList2] = useState(false);     // 팝업   Drop
  const [showDropData, setShowDropData] = useState('');  // 가져갈 Drop Data
  // const [showDropData2, setShowDropData2] = useState('');  // 가져갈 Drop Data
  // DropDownList Data (select의 option같은 개념)
  const dropDownListData = ["무역전시관입구", "대전컨벤션센터", "한밭수목원", "정부청사 입구", "대전시청", "엑스포과학공원"];
  const dropDownListData2 = ["단말기 고장", "브레이크 고장", "체인체결 불량", "타이어 펑크", "페달 고장", "기타"];

  // const [test, setTest] = useState(false);
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
    setShowDropDownList(false);
    setShowDropDownList2(false);
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


  // 팝업 선택 버튼 클릭시 기존 버튼 숨기기
  if (showInput === true || showDropDownList === true || showDropDownList2 === true) {
    if (move) {
      move.style.display = 'none';
    }
    if (breakdown) {
      breakdown.style.display = 'none';
    }
    if (pay) {
      pay.style.display = 'none';
    }
  }

  // 결제 버튼
  const onPay = () => {
    setShowInput(true);
    setInputText('결제금액');
    setShowBtn(true);
    setShowBtnText('결제요청');
    setInputData('')
  }

  // 이동 버튼
  // let breakSelect = document.querySelector('.breakSelect');
  const onMove = (e) => {
    console.log('onMove 클릭');
    setShowBtn(true);
    setShowBtnText('이동요청');
    setShowDropDownList(true);
    // console.log('breakSelect', breakSelect);
    // if (breakSelect) {
    //   console.log('moveSelect if문 접근 후');
    //   breakSelect.style.display = 'none';
    // }
  };

  // 고장 버튼
  const onBreakdown = () => {
    // setShowInput(true)
    setShowBtn(true)
    // setInputText('고장 사유를 입력해주세요.');
    setShowBtnText('고장접수');
    setShowDropDownList2(true);
  }

  // input에 입력한 글 업데이트
  const onChange = useCallback((e) => {
    if (e.target.name === 'namePay') {
      setInputData(e.target.value);
    } else if (e.target.name === 'move') {
      setShowDropData(e.target.value)
      setDropData(e.target.value);
    } else if (e.target.name === 'break') {
      setShowDropData(e.target.value)
      setDropData2(e.target.value);
    }
  }, []
  );
  // 현재 날짜 한국어로 받기
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const currentDate = new Date().toLocaleString('ko-KR', options);  // ko-KR : 한국어로 지정, 옵션변수에 담아 사용
  
  const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

  // 랜덤한 날짜와 시간을 생성
  const randomDate = new Date();
  randomDate.setDate(Math.floor(Math.random() * 31) + 1); // 1에서 31 사이의 날짜
  randomDate.setMonth(Math.floor(Math.random() * 12)); // 0에서 11 사이의 월 (0은 1월)
  randomDate.setFullYear(Math.floor(Math.random() * 5) + 2018); // 2010에서 2020 사이의 연도
  randomDate.setHours(Math.floor(Math.random() * 24)); // 0에서 23 사이의 시간
  randomDate.setMinutes(Math.floor(Math.random() * 60)); // 0에서 59 사이의 분
  randomDate.setSeconds(Math.floor(Math.random() * 60)); // 0에서 59 사이의 초

  // 랜덤 날짜 한국어로 받기
  const formatDate = randomDate.toLocaleString('ko-KR', options2);

  const onSendData = async (e) => {
    // console.log('e.target.textContent', e.target.textContent);
    // navigate('/MoveRequest', <MoveRequest test={test} />);
    if (e.target.textContent === '이동요청') {
      if (showDropData.length > 1) {
        await addDoc(collection(dbService, "move"), {
          // await dbService.collection("nweets").add({
          createdAt: currentDate,          // 현재날짜
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식,
          text: showDropData
        });
        setInputData(""); //입력창 초기화
        alert(' 해당 데이터를 이동요청 하였습니다.');
        setOpen(false)
        // setShowInput(false)
        setShowBtn(false)
        setShowDropDownList(false)
        setShowDropData('');
        // ※ 공란체크도 필요
      } else if (showDropData.length <= 1) {
        alert('이동 도착예정지를 선택해주세요.');
      }

    } else if (e.target.textContent === '고장접수') {

      if (showDropData.length > 1) {
        await addDoc(collection(dbService, "break"), {
          // await dbService.collection("nweets").add({
          createdAt: currentDate,  // 필요한 부분만 잘라서 add
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식,
          text: showDropData
        });
        alert('고장 신고를 접수하였습니다..');
        setOpen(false)
        setShowBtn(false)
        setShowDropDownList(false)
        setShowDropData('');
        // ※ 공란체크도 필요
      } else if (showDropData.length <= 1) {
        alert('고장 신고 사유를 입력해 주세요.');
      }

    } else if (e.target.textContent === '결제요청') {
      if (inputData.length >= 4) {
        await addDoc(collection(dbService, "pay"), {
          // await dbService.collection("nweets").add({
          // createdAt: Date().substring(11, 24),  // 필요한 부분만 잘라서 add
          createdAt: formatDate,  // 필요한 부분만 잘라서 add
          이동수단ID: newData.이동수단ID,
          위치: newData.위치,
          상세위치: newData.상세위치,
          타입: newData.타입,
          연식: newData.연식,
          text: inputData + '원'
        });
        alert(' 결제내역을 추가하셨습니다.');
        setOpen(false)
        setShowBtn(false)
        setShowInput(false)
        setInputText('');
        // ※ 공란체크도 필요
      } else if (inputData.length < 4) {
        alert('결제내역을 입력해주세요.');
      }

    }


  }

  // const handleChange = (e) => {
  //   setDropData(e.target.value);
  //   console.log('D L : ', e.target.value);
  // }

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
      <Naver manageData={item} clickData={clickData} />

      {open === true ?
        (<div className='popup' style={{ display: 'none' }}>
          <div onClick={closePopup}>X</div>
          선택한 이동수단ID : {newData.이동수단ID}<br />
          상세위치 : {newData.상세위치}<br />
          <Button className='pay' onClick={onPay}>결제신청</Button>
          <Button className='move' onClick={onMove}>이동신청</Button>
          <Button className='breakdown' onClick={onBreakdown}>고장신고</Button>
          {showInput && <Input name='namePay' placeholder={inputText} value={inputData} onChange={onChange} />}
          {showBtn && <Button onClick={onSendData} name={showBtnText}>{showBtnText}</Button>}


          {showDropDownList &&
            <DropDownList
              name="move"
              className='moveSelect'
              data={dropDownListData}
              value={dropData}
              onChange={onChange}
              style={{
                width: "300px",
              }}
            />
          }

          {showDropDownList2 &&
            <DropDownList
              name="break"
              className='breakSelect'
              data={dropDownListData2}
              value={dropData2}
              onChange={onChange}
              style={{
                width: "300px",
              }}
            />
          }

        </div >
        ) : ""
      }
    </>
  );
}

export default Manage