import React from 'react';
import { useState } from 'react';
import { dbService } from 'fbase';

function TestUpdate({ item }) {
    const [editIng, setEditIng] = useState(true);
    const [newData, setNewData] = useState(true);

    const onToggle = () => {
        console.log(editIng);
        setEditIng(function (prev) { return !prev })
        // setEditIng((prev) => !prev)
    }

    const onChange = (e) => {
        setNewData(e.target.value);
    }

    const onUpdate = () => {
        console.log("onUpdate");
        dbService.doc(`test/${item.id}`).update({
            data: newData
        })
        setEditIng((prev) => !prev)
    }
    return (
        <>
            <button onClick={onToggle}>{editIng ? "수정하기" : "취소"}</button>
            {!editIng &&
                <>
                    <br />
                    <label>수정 : </label>
                    <input placeholder='수정할 text 입력' onChange={onChange} />
                    <button onClick={onUpdate}>수정</button>
                </>
            }
        </>
    )
}

export default TestUpdate
