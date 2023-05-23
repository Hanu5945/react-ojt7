import React from 'react'
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";
const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function Line() {
    return (
        <div>
            <Chart>
                <ChartTitle text="Units sold" />
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        title={{
                            text: "Months",
                        }}
                        categories={categories}
                    />
                </ChartCategoryAxis>
                <ChartSeries>
                    <ChartSeriesItem type="line" data={[123, 276, 310, 212, 240, 156, 98]} />
                    <ChartSeriesItem type="line" data={[165, 210, 287, 144, 190, 167, 212]} />
                    <ChartSeriesItem type="line" data={[56, 140, 195, 46, 123, 78, 95]} />
                </ChartSeries>
            </Chart>
        </div>
    )
}

export default Line
