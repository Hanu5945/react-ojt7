import React from 'react';
import { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";

function Manage({ item }) {
  // 초기 데이터 상태
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = useState(initialDataState);   // 페이지와 페이지 크기 관련 상태 관리
  const [pageSizeValue, setPageSizeValue] = useState(); // 현재 선택된 페이지 크기 관리 (undefined로 설정한 이유 : 초기 렌더링 시에는 사용자가 크기를 선택하지 않았기 때문)
  console.log('pageSizeValue', pageSizeValue);

  // 페이지 변경 시 호출되는 콜백 함수
  const pageChange = (event) => {
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
        onPageChange={pageChange}
      >
        {/* field - 받은 데이터의 key값, title - 보여줄 컬럼명 */}
        <GridColumn field="이동수단ID" title="이동수단ID" />
        <GridColumn field="위치" title="위치" />
        <GridColumn field="상세위치" title="상세위치" />
        <GridColumn field="타입" title="타입" />
        <GridColumn field="연식" title="연식" />
      </Grid>
    </>
  );
}

// 100개의 데이터 생성 test

// const products = Array.from({ length: 100 }, (_, index) => ({
//   이동수단ID: `ID ${index + 1}`,
//   위치: `위치 ${index + 1}`,
//   상세위치: `상세위치 ${index + 1}`,
//   타입: `타입 ${index + 1}`,
//   연식: `연식 ${index + 1}`
// }));

export default Manage