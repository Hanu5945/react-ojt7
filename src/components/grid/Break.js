import React from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";

function Break({breakData}) {
    return (
        <div>
            <Grid data={breakData}>
                <GridColumn field='createdAt' title='고장신고접수 날짜' />
                <GridColumn field='이동수단ID' title='이동수단ID' />
                <GridColumn field='위치' title='위치' />
                <GridColumn field='상세위치' title='상세위치' />
                <GridColumn field='연식' title='연식' />
                <GridColumn field='타입' title='타입' />
                <GridColumn field='text' title='고장신고사유' />
            </Grid>
        </div>
    )
}

export default Break
