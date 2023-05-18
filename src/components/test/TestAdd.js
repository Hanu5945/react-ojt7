import React from 'react'
import { useState } from 'react'
import { dbService } from 'fbase';
import { collection, addDoc } from "firebase/firestore";

function TestAdd({ userObj }) {
    const [text, setText] = useState("");

    const onAdd = async () => {
        // 해당 텍스트가 add되어야 함
        await addDoc(collection(dbService, "test"), {
            data: text,
            now: Date.now(),
            creatorId: userObj.uid,
        })
        setText("")
    }

    const onChange = (e) => {
        setText(e.target.value);
    }

    // useEffect(() => {
    //     dbService.collection('test').onSnapshot(snapshot => {
    //         console.log("snapshot docs : ", snapshot.docs);

    //         const text = snapshot.docs.map(doc => ({
    //             id: doc.id,    // id를 가져옴
    //             ...doc.data() // 모든 data를 받아옴 (요소를 가져옴)
    //         }))
    //         setText(text);
    //     });
    // }, []);
    // console.log("text: ", text);
    return (
        <div>
            <label> Add : </label><input placeholder='text' onChange={onChange} />
            <button onClick={onAdd}>Add</button>
        </div>
    )
}

export default TestAdd
