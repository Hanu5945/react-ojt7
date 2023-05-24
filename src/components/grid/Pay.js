import React, { useState } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { orderBy } from '@progress/kendo-data-query';
import { ExcelExport } from "@progress/kendo-react-excel-export";

function Pay({ payData }) {
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
        const take = targetEvent.value === "All" ? payData.length : event.page.take; // All인 경우 : data의 길이를 전부 보여줌, 아닌 경우 : 선택한 숫자만큼 보여줌
        if (targetEvent.value) {
            setPageSizeValue(targetEvent.value);  // 페이지 크기를 변경할 때마다 렌더링
        }
        setPage({
            ...event.page,  // 선택한 페이지와 선택한 페이지 크기 관련 상태 관리
            take,           // 한 페이지에 보여줄 항목 수(위의 event에서 정의된 변수를 가져옴)
        });
    };

    // 그리드의 정렬 상태를 관리
    const [sort, setSort] = useState([{ field: 'createdAt', dir: 'asc' }]); // field: 정렬할 필드 이름 , dir: 정렬 방향 'asc'는 오름차순 'desc'는 내림차순 정렬
    const handleSortChange = (event) => {
        setSort(event.sort);
    };

    // 해당 데이터를 orderby해준다 (import 사용)
    const sortedData = orderBy(payData, sort);

    // 엑셀 다운로드 (ExcelExport 컴포넌트의 참조를 저장하는 역할)
    let _export;
    // 엑셀 다운로드 함수
    const exportExcel = () => {
        _export.save(); //_export 에 저장된 save 메서드 호출 (save 메서드는 현재 데이터를 엑셀 파일로 내보내는 역할)
    };

    return (
        <div>
            {/* ExcelExport안에 Grid를 넣어서 엑셀 다운로드 */}
            <ExcelExport
                data={payData}              // 엑셀로 내보낼 데이터 설정
                ref={(exporter) => {        // ref에 prop을 사용 > ()는 ExcelExport 컴포넌트의 참조
                    _export = exporter;     // 전달인자를 _export 변수에 할당
                }}
            >
                <Grid
                    data={sortedData.slice(page.skip, page.take + page.skip)} // 넣을 데이터 정보
                    skip={page.skip}        // 처음 표시할 데이터의 인덱스
                    take={page.take}        // 한 페이지에 보여줄 항목 수
                    total={payData.length}  // 전체 데이터 항목 수 (그리드가 전체 데이터의 크기를 알고 페이징 처리를 할 수 있음)
                    pageable={{
                        buttonCount: 4,                 // 페이징 버튼 수
                        pageSizes: [5, 10, 15, "All"],  // 페이지 크기 선택 옵션
                        pageSizeValue: pageSizeValue,   // 초기 페이지 크기
                    }}
                    sortable={true}
                    sort={sort}
                    onPageChange={onPageChange}         // 페이지 변경시 함수 호출
                    onSortChange={handleSortChange}     // 정렬시 함수 호출
                >
                    <GridToolbar><button onClick={exportExcel}>엑셀 전체 다운로드</button></GridToolbar>
                    <GridColumn field='createdAt' title='결제일/시간' />
                    <GridColumn field='이동수단ID' title='이동수단ID' />
                    <GridColumn field='상세위치' title='결제위치' />
                    <GridColumn field='text' title='결제금액' />
                </Grid>
            </ExcelExport>
        </div>
    )
}

export default Pay
