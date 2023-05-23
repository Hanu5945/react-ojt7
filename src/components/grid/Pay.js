import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import "@progress/kendo-theme-default/dist/all.css";

function Pay({payData}) {
    return (
        <div>
            <Grid data={payData}>
                <GridColumn field='createdAt' title='결제일/시간' />
                <GridColumn field='이동수단ID' title='이동수단ID' />
                <GridColumn field='상세위치' title='결제위치' />
                <GridColumn field='text' title='결제금액' />
            </Grid>
        </div>
    )
}

export default Pay
