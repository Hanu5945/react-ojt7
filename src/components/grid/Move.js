import React from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";

function Move({ move }) {
    return (
        <div>
            <Grid data={move}>
                <GridColumn field='createdAt' title='요청날짜' />
                <GridColumn field='이동수단ID' title='이동수단ID' />
                <GridColumn field='위치' title='위치' />
                <GridColumn field='상세위치' title='상세위치' />
                <GridColumn field='연식' title='연식' />
                <GridColumn field='타입' title='타입' />
                <GridColumn field='text' title='도착예정지' />
            </Grid>
            {/* {move.map((item) =>
        <>
          <div>{item.createdAt}</div>
          <div> 추가한 텍스트 : {item.text}</div>
          <div>{item.상세위치}</div>
          <div>{item.위치}</div>
          <div>{item.연식}</div>
          <div>{item.이동수단ID}</div>
          <div>{item.타입}</div><br/>
        </>
      )} */}
        </div>
    )
}

export default Move
