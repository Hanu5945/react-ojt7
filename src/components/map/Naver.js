import React, { useEffect } from 'react';

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

    const xy = item.map((xyData) => {
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
            // tooltipContent += `구매일자 : ${item[idx].createdAt}</br>`;
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
    }, [item, lat, long, clickIdx]);

    return <div id="map" style={{ width: '50%', height: '400px' }}></div>;
}

export default Naver;