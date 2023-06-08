import React, { useEffect } from 'react';

function Naver({ manageData, clickData }) {
    let clickIdx;

    // 클릭한 데이터 인덱스를 찾아 변수에 할당
    if (clickData) {
        clickIdx = manageData.indexOf(clickData); 
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
            window.naver.maps.Event.addListener(marker, 'click', ((clickIdx) => {
                return () => {
                    openTooltip(clickIdx);
                };
            })(i));

            markers.push(marker);
        }

        const openTooltip = (clickIdx) => {
            let tooltipContent = `<div class="tooltip">`;
            tooltipContent += `이동수단ID : ${manageData[clickIdx].이동수단ID}</br>`;
            tooltipContent += `위치 : ${manageData[clickIdx].위치}</br>`;
            tooltipContent += `상세위치 : ${manageData[clickIdx].상세위치}</br>`;
            tooltipContent += `타입 : ${manageData[clickIdx].타입}</br>`;
            tooltipContent += `연식 : ${manageData[clickIdx].연식}</br>`;
            tooltipContent += `</div>`;

            const tooltip = new window.naver.maps.InfoWindow({
                content: tooltipContent,
                disableAnchor: false,
            });

            // 툴팁 open
            tooltip.open(map, markers[clickIdx]);

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
            <div>
                <h4 style={{ textAlign: 'center' }}>이동수단 위치 및 정보</h4>
                <div id="map"
                    style={{
                        width: '100%',
                        height: '400px',
                        border: '1px solid black'
                    }}>
                </div>
            </div>
        </>)
}

export default Naver;