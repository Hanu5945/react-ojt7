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
const areaData = [
  {
    name: "World",
    data: [3.988, 3.733, 3.994],
  },
  {
    name: "Germany",
    data: [2.21, 2.375, 2.161],
  },
  {
    name: "Russian Federation",
    data: [1.743, 1.295, 1.175],
  },
  {
    name: "India",
    data: [0.907, 0.943, 0.848],
  },
];
function Area() {
  return (
    <div>
      <div className="col-6">
        <div className="k-card">
          <Chart
            style={{
              height: 350,
            }}
          >
            <ChartTitle text="Area Chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories} startAngle={45} />
            </ChartCategoryAxis>
            <ChartSeries>
              {areaData.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="area"
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

export default Area