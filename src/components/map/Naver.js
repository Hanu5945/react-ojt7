import React, { useEffect } from 'react';

function Naver({ manageData, clickData }) {
    // 그리드 데이터를 클릭하면 해당 내용의 툴팁이 표시
    // 클릭한 행의 Idx와 데이터
    // console.log('clickData', clickData);

    // console.log('clickData좌표', clickData.좌표);
    let clickIdx;

    // clickData가 있을때만 실행
    if (clickData) {
        clickIdx = manageData.indexOf(clickData); // 클릭한 데이터 길이를 변수에 할당
    }

    const xy = manageData.map((xyData) => {
        return xyData.좌표;
    });

    const lat = xy.map((data) => {
        return data._lat;
    });

    const long = xy.map((data) => {
        return data._long;
    });

    useEffect(() => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(36.35, 127.4),
            zoom: 11,
        };

        const map = new window.naver.maps.Map('map', mapOptions);

        const markers = [];

        for (let i = 0; i < manageData.length; i++) {
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
            tooltipContent += `이동수단ID : ${manageData[idx].이동수단ID}</br>`;
            tooltipContent += `위치 : ${manageData[idx].위치}</br>`;
            tooltipContent += `상세위치 : ${manageData[idx].상세위치}</br>`;
            tooltipContent += `타입 : ${manageData[idx].타입}</br>`;
            tooltipContent += `연식 : ${manageData[idx].연식}</br>`;
            // tooltipContent += `구매일자 : ${manageData[idx].createdAt}</br>`;
            tooltipContent += `</div>`;

            const tooltip = new window.naver.maps.InfoWindow({
                content: tooltipContent,
                disableAnchor: false,
                pixelOffset: new window.naver.maps.Point(0, 1),
            });

            // 툴팁 open
            tooltip.open(map, markers[idx]);

        };

        // 그리드 클릭한 행이 있다면 openTooltip 함수 실행
        if (clickIdx !== undefined) {
            openTooltip(clickIdx);
        }

        return () => {
            // Cleanup code
        };
    }, [manageData, lat, long, clickIdx]);

    return (
        <>
            위치 및 정보 확인
            <div id="map" style={{ width: '50%', height: '400px' }}>

            </div>
        </>)
}

export default Naver;