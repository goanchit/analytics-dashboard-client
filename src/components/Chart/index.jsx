import React from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import useMediaQuery from '@mui/material/useMediaQuery';

const Chart = ({ chartdata, chartDataLoader }) => {

  const isMobile = useMediaQuery('(min-width:900px)')

  const transformChartData = (data) => {
    return [
      {
        "name": "Failure Count",
        "value": data ? data.failure_count : 0 ,
        "fill": "#384E77"
      },
      {
        "name": "Total Visitors",
        "value": data ? data.total_visitors : 0,
        "fill": "#8BBEB2",
      },
      {
        "name": "Unique Users",
        "value": data ? data.unique_users : 0,
        "fill": '#0D0630'
      }
    ]
  }  

  let renderLabel = function(entry) {
    return `${entry.name} - (${entry.value})`;
  }

  let renderColor = function(entry) {
    return `${entry.fill}`
  }

  return (
    <ResponsiveContainer width={"100%"} height={!isMobile ? 200: 300}>
        <PieChart>
            <Pie dataKey="value" data={chartDataLoader ? {} : transformChartData(chartdata)} fill={renderColor} label={renderLabel} />
        </PieChart>
      </ResponsiveContainer>
  )
}

export default Chart;