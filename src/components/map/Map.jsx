import React, { useState, useEffect } from 'react';
import MapContext from './MapContext.js';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { Tile as TileLayer } from 'ol/layer';
import { XYZ } from 'ol/source';
import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction';
import Overlay from 'ol/Overlay';
import styles from './style.module.css'

const Map = ({ children, item }) => {
  const [mapObj, setMapObj] = useState({});

  useEffect(() => {
    const map = new OlMap({
      controls: defaultControls({ zoom: false, rotate: false }).extend([
        new FullScreen(),
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://api.vworld.kr/req/wmts/1.0.0/268ABF52-F384-3A6E-B9EC-0726AF0733BF/Base/{z}/{y}/{x}.png',
          }),
        }),
      ],
      target: 'map',
      view: new View({
        projection: getProjection('EPSG:3857'),
        center: fromLonLat([127.42, 36.33], getProjection('EPSG:3857')),
        zoom: 11,
      }),
    });



    // let jh = item[0].좌표._lat;
    // let jh = item[0].좌표._long;
    // console.log("jh", jh);

    // item에서 좌표를 꺼내옴
    let jh = item.map((data) => data.좌표);

    // 꺼내온 좌표에서 위도 경도를 추출함
    let lat = jh.map((jh) => jh._lat)
    let long = jh.map((jh) => jh._long)
    console.log('lat', lat);
    console.log('long', long);
    
    // 마커 생성
    const marker = new Overlay({
      position: fromLonLat([long[0], lat[0]], getProjection('EPSG:3857')),
      positioning: 'center-center',
      element: document.createElement('div'), // 마커로 사용할 HTML 요소 생성
      stopEvent: false, // 마커 요소에서의 이벤트 처리를 지도로 전달하기 위해 false로 설정
    });

    // 마커 요소에 스타일과 내용 추가
    const markerElement = marker.getElement();
    markerElement.className = styles.marker;
    markerElement.innerHTML = 'Marker';

    // 지도에 마커 추가
    map.addOverlay(marker);

    setMapObj({ map });

    return () => {
      map.setTarget(null);
      map.removeOverlay(marker);
    };
  }, [item]); // item이 변경될때마다 useEffect가 실행



  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>;
};

export default Map;