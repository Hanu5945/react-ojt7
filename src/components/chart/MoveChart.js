import React from 'react'
import { Chart, ChartLegend, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';

function MoveChart({ moveData }) {

    // 이동수단별 빈도수 계산
    const counts = {};
    moveData.forEach(item => {
        const 도착예정지 = item.text;
        counts[도착예정지] = counts[도착예정지] ? counts[도착예정지] + 1 : 1;
    });

    // 이동수단별 빈도수를 차트 데이터로 변환
    const chartData = Object.keys(counts).map(도착예정지 => ({
        category: 도착예정지,
        value: counts[도착예정지]
    }));
    return (
        <div>
            <h4
                style={{
                    textAlign: 'center',
                    borderTop: '1px black solid',
                    paddingTop: '30px'
                }}
            >도착예정지 요청
            </h4>
            <Chart>
                <ChartSeries>
                    <ChartSeriesItem
                        type="column"
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
    )
}

export default MoveChart
