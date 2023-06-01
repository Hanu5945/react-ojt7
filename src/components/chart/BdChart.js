import React from 'react';
import { Chart, ChartLegend, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';

function BdChart({ breakData }) {

    // 이동수단별 빈도수 계산
    const counts = {};
    breakData.forEach(item => {
        const 이동수단ID = item.이동수단ID;
        counts[이동수단ID] = counts[이동수단ID] ? counts[이동수단ID] + 1 : 1;
    });

    // 이동수단별 빈도수를 차트 데이터로 변환
    const chartData = Object.keys(counts).map(이동수단ID => ({
        category: 이동수단ID,
        value: counts[이동수단ID]
    }));
    // console.log('BdPie', breakData);

    return (
        <div>
            <h4
                style={{
                    textAlign: 'center',
                    borderTop: '1px black solid',
                    paddingTop: '30px'
                }}
            >고장신고 접수 기록
            </h4>
            <Chart>
                <ChartSeries>
                    <ChartSeriesItem
                        type="pie"
                        data={chartData}
                        categoryField="category"
                        field="value"
                        tooltip={{
                            visible: true,
                        }}
                    />
                </ChartSeries>
                <ChartLegend visible={true} position="bottom" />
            </Chart>
        </div>
    );
}

export default BdChart;