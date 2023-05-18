import React from 'react';
import { dbService } from 'fbase';

function TestDlelet({ item }) {
  const onDellet = () => {
    dbService.doc(`test/${item.id}`).delete();
  }

  return (
    <>
      <button onClick={onDellet}>Dlelet</button>
    </>
  )
}

export default TestDlelet