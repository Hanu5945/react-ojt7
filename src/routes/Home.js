import React from 'react';
import PayChart from 'components/chart/PayChart';
import BdChart from 'components/chart/BdChart';
import MoveChart from 'components/chart/MoveChart';
import Naver from 'components/map/Naver'
import { useState, useEffect } from 'react'
import { dbService } from 'fbase';
function Home() {
    const [payData, setPayDate] = useState([]); // 파이어베이스 pay 컬렉션 저장할 state

    useEffect(() => {
        dbService.collection('pay').onSnapshot(snap => {

            const payArray = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))
            // sort 사용하여 오름차순
            payArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
            setPayDate(payArray);
            setBreakData(payArray);
        })
    }, [])

    const [breakData, setBreakData] = useState([]); // 파이어베이스 break 컬렉션 저장

    useEffect(() => {
        dbService.collection('break').onSnapshot(snapshot => {
            const breakArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            // sort 사용하여 오름차순
            breakArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
            setBreakData(breakArray);
        })
    }, [])

    const [manageData, setManageData] = useState([]);

    useEffect(() => {
        // snapshot : 데이터베이스가 변화할때마다 감지한다 (즉, collection 'manage'가 변화하면 감지)
        dbService.collection('manage').onSnapshot(snapshot => {
            console.log("snapshot docs : ", snapshot.docs);

            const dbData = snapshot.docs.map(doc => ({
                id: doc.id,     // 문서ID
                ...doc.data(),  // 데이터 ...사용하여 요소로 접근
            }))

            // sort 사용하여 오름차순
            dbData.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));

            setManageData(dbData);
        })
    }, [])

    const [moveData, setMoveData] = useState([]);

    useEffect(() => {
        dbService.collection("move").onSnapshot(snapshot => {
            // console.log('snapshot.docs', snapshot.docs);

            const moveArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            // sort 사용하여 오름차순
            moveArray.sort((a, b) => a.이동수단ID.localeCompare(b.이동수단ID));
            setMoveData(moveArray);
        })
    }, [])
    return (
        <div>
            Home
            <PayChart payData={payData} />

            <BdChart breakData={breakData} />

            <Naver manageData={manageData} />

            <MoveChart moveData={moveData} />
            {/* Home 2023 05 24 집에서 수정함 */}

        </div>
    )
}

export default Home
