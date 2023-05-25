import React from 'react'
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle } from '@progress/kendo-react-charts';


function PayChart({ payData }) {

  // 연도를 구함
  let arrayDate = payData.map((item) => item.createdAt.substr(0, 4))  // 필요한 년도만 남김
  let resultDate = [...new Set(arrayDate)];  // 년도 중복된 값 제거
  resultDate.sort();  // sort 사용하여 연도별로 정리

  // 연도별 결제금액 데이터 생성
  const dataByYear = resultDate.map((year) => {
    const paymentsByYear = payData.filter((item) => item.createdAt.includes(year));
    const totalPayment = paymentsByYear.reduce((sum, item) => sum + parseInt(item.text), 0);    // 연도별 합계 총액을 구함
    // console.log('totalPayment', totalPayment);
    return {
      year,
      totalPayment,
    };
  });

  // 차트 데이터 설정
  const chartData = dataByYear.map((item) => ({
    category: item.year,
    value: item.totalPayment,
  }));
  // console.log('dataByYear', dataByYear);


  return (
    <div>
      <Chart>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            categories={resultDate} // 기준으로 삼을 연도 데이터
          />
        </ChartCategoryAxis>
        <ChartTitle text={`연도별 결제금액 차트`} />
        <ChartSeries>
          <ChartSeriesItem
            type="area"
            data={chartData}    // 기준으로 삼을 연도 데이터
            field="value"
            categoryField="category"
            tooltip={{
              visible: true,
            }}
          />
        </ChartSeries>
      </Chart>
    </div>
  )
}

export default PayChart
