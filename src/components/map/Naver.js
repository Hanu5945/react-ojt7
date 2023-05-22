import React, { useEffect, useRef } from 'react';

function Naver({ item, clickData }) {
    // 그리드 데이터를 클릭하면 해당 내용의 툴팁이 표시
    // 클릭한 행의 Idx와 데이터
    // console.log('clickData', clickData);

    // console.log('clickData좌표', clickData.좌표);
    let clickIdx;

    // clickData가 있을때만 실행
    if (clickData) {
        clickIdx = item.indexOf(clickData); // 클릭한 데이터 길이를 변수에 할당
    }
    //         let clickLat = clickData.좌표._lat;
    //         let clickLong = clickData.좌표._long;
    // 해당 그리드 클릭하면
    // 해당 마커에
    // 해당 데이터 띄우기

    // useEffect(() => {
    //     // 클릭한 데이터가 있을때만
    //     if (clickData) {
    //         let clickIdx = item.indexOf(clickData);
    //         let clickLat = clickData.좌표._lat;
    //         let clickLong = clickData.좌표._long;
    //         // console.log('clickIdx ', clickIdx);

    //         // 옵션생성
    //         const mapOptions2 = {
    //             center: new window.naver.maps.LatLng(clickLat, clickLong),
    //             zoom: 11,
    //         };

    //         // 맵 생성
    //         const map2 = new window.naver.maps.Map('map', mapOptions2);


    //         // 마커생성
    //         const marker2 = new window.naver.maps.Marker({
    //             position: new window.naver.maps.LatLng(clickLat, clickLong),
    //             map: map2,
    //         });

    //         // 해당 데이터를 클릭하면 해당 마커 위에 해당 데이터 표시
    //         const openTooltip2 = (clickIdx) => {
    //             let tooltipContent = `<div class="tooltip">`;
    //             tooltipContent += `${clickIdx}`;
    //             tooltipContent += `</div>`;

    //             const tooltip2 = new window.naver.maps.InfoWindow({
    //                 content: tooltipContent,
    //                 disableAnchor: false,
    //                 pixelOffset: new window.naver.maps.Point(0, 1),
    //             });

    //             openTooltip2(clickIdx);

    //             // 툴팁 open 및 close
    //             tooltip2.open(map2, marker2[clickIdx]);
    //             // if (bl.current === true) {
    //             //     bl.current = false;
    //             //     console.log('bl이 true일때만 실행');
    //             // } else if (bl.current === false) {
    //             //     tooltip2.close();
    //             //     bl.current = true;
    //             //     console.log('bl이 false일때만 실행');
    //             // }
    //             // console.log('bl : ', bl.current);


    //         };
    //     }
    // }, [])



    const xy = item.map((xyData) => {
        return xyData.좌표;
    });

    const lat = xy.map((data) => {
        return data._lat;
    });

    const long = xy.map((data) => {
        return data._long;
    });

    let bl = useRef(true);  // 무한 재귀 렌더 방지 useRef 훅 사용

    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(36.35, 127.4),
            zoom: 11,
        };

        const map = new window.naver.maps.Map('map', mapOptions);

        const markers = [];

        for (let i = 0; i < item.length; i++) {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(lat[i], long[i]),
                map: map,
            });

            // 클릭시 openTooltip 함수 실행
            window.naver.maps.Event.addListener(marker, 'click', ((idx) => {
                return () => {
                    openTooltip(idx);
                };
            })(i));

            markers.push(marker);
        }

        const openTooltip = (idx) => {
            let tooltipContent = `<div class="tooltip">`;
            tooltipContent += `이동수단ID : ${item[idx].이동수단ID}</br>`;
            tooltipContent += `위치 : ${item[idx].위치}</br>`;
            tooltipContent += `상세위치 : ${item[idx].상세위치}</br>`;
            tooltipContent += `타입 : ${item[idx].타입}</br>`;
            tooltipContent += `연식 : ${item[idx].연식}</br>`;
            tooltipContent += `${idx}`;
            tooltipContent += `</div>`;

            const tooltip = new window.naver.maps.InfoWindow({
                content: tooltipContent,
                disableAnchor: false,
                pixelOffset: new window.naver.maps.Point(0, 1),
            });

            // 툴팁 open 및 close
            tooltip.open(map, markers[idx]);



            // 클릭했던것과 마커가 같으면 닫음
            if (bl.current === true || idx === clickIdx) {
                bl.current = false;
                // 다시 클릭하거나 클릭했던 마커가 아닌 경우 툴팁을 닫음

                // 마커가 켜져있으면서 or 선택한 인덱스와 clickIdx가 같으면 툴팁을 닫는다.
                console.log('여기까지는 오나');
                if (bl.current === true && idx !== clickIdx) {
                    console.log('여기까지는 오나');

                }
            } else if (bl.current !== true || idx !== clickIdx) {
                tooltip.close();
                bl.current = true;
            }


            // 툴팁 생성
            // 1. 클릭한 마커가 다른 마커일 경우 툴팁 제거

            // console.log('clickIdx', clickIdx);
            // 클릭 한게 툴팁 닫기

            // 클릭한 마커가 다르면 툴팁 close
            // if (markers[idx] !== markers[idx]) {
            // console.log('markers[idx] : ', markers[idx]);
            // console.log('markers[clickIdx] : ', markers[clickIdx]);
            // tooltip.close();
            // }

            // console.log('bl : ', bl.current);

        };

        // undefined이 아니면 openTooltip 함수 실행
        if (clickIdx !== undefined) {
            openTooltip(clickIdx);
            // bl.current =true;


        }

        return () => {
            // Cleanup code
        };
    }, [item, lat, long, clickIdx, bl]);

    return <div id="map" style={{ width: '50%', height: '400px' }}></div>;
}

export default Naver;