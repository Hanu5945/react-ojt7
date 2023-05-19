import React from 'react';
import { useEffect } from 'react';

function Naver({ item }) {
    // 위도경도 저장
    const xy = item.map((xyData) => {
        return xyData.좌표
    })
    /// lat 위도, long 경도
    const lat = xy.map((data) => { return data._lat })
    const long = xy.map((data) => { return data._long })

    useEffect(() => {
        // 지도 옵션
        const mapOptions = {
            center: new window.naver.maps.LatLng(36.35, 127.4), // 중심좌표
            zoom: 11,   // 줌 레벨
        };
        // 네이버 지도 생성, 옵션 추가
        const map = new window.naver.maps.Map('map', mapOptions);




        const markers = [];
        // 마커 등록
        for (let i = 0; i <= item.length; i++) {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(lat[i], long[i]),   // 마커 위치
                map: map,   // map 객체에 추가 (해당 마커를 어느 지도에 추가할지)
            });

            // 클로저 함수는 외부 함수의 변수에 접근할 수 있다.
            // (i)는 세번째 클로저 함수를 정의
            // 클로저 함수의 값은 (i)가 된다.
            // 이를 통해 해당 마커의 클릭 이벤트에서 정확한 인덱스 값을 참조할 수 있다.
            window.naver.maps.Event.addListener(marker, 'click', ((idx) => {
                console.log('idx', idx);
                return () => {
                    openTooltip(idx);   // 툴팁 함수의 전달인자는 클로저 값
                };
            })(i));
            markers.push(marker);

        }

        // 툴팁
        const openTooltip = (idx) => {
            // 툴팁내용
            const tooltipContent = `<div class="tooltip"> 마커 ${idx} 툴팁</div>`;
            // InfoWindow 클래스는 지도 위에 올리는 정보 창을 정의
            const tooltip = new window.naver.maps.InfoWindow({
                content: tooltipContent,
                disableAnchor: false,      // 말풍선 꼬리
                pixelOffset: new window.naver.maps.Point(0, 1),
            });

            tooltip.open(map, markers[idx]);
        };

        return () => {
            // 클린업 함수 (주로 리소스 정리나 이벤트 핸들러 등을 해제하는 역할)
            // marker.setMap(null);
            // map.destroy();
        };
    }, [item.length, lat, long]);   // 데이터나 좌표가 변경될때마다 재실행

    // 지도 표시
    return <div id="map" style={{ width: '50%', height: '400px' }}>
    </div>;
}

export default Naver;