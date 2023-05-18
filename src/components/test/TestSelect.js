import React from 'react'

function TestSelect({itemObj}) {
  return (
    <div style={{border:'1px solid black'}}>
      CreatorId : {itemObj.creatorId}<br/>
      DataId : {itemObj.id}<br/>
      Data : {itemObj.data}<br/>
      Now : {itemObj.now}<br/>
    </div>
  )
}

export default TestSelect
