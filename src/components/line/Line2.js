import React from 'react'; import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";
import "hammerjs";

const categories = [2002, 2003, 2004];
const series = [
  {
      name: "India",
      data: [3.907, 7.943, 7.848],
  },
  {
      name: "Russian Federation",
      data: [4.743, 7.295, 7.175],
  },
  {
      name: "Germany",
      data: [0.21, 0.375, 1.161],
  },
  {
      name: "World",
      data: [1.988, 2.733, 3.994],
  },
];

function Line2() {
  return (
    <div>

      <div className="col-6">
        <div className="k-card">
          <Chart
            style={{
              height: 350,
            }}
          >
            <ChartTitle text="Line Chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories} startAngle={45} />
            </ChartCategoryAxis>
            <ChartSeries>
              {series.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="line"
                  tooltip={{
                    visible: true,
                  }}
                  data={item.data}
                  name={item.name}
                />
              ))}
            </ChartSeries>
          </Chart>
        </div>
      </div>
    </div>
  )
}

export default Line2
