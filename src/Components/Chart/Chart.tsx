import type { ITransaction } from "@/Types/Interface/ITransaction"
import { Chart, useChart } from "@chakra-ui/charts"
import {
  Area,
  AreaChart,
//   CartesianGrid,
//   Legend,
  Tooltip,
  XAxis,
} from "recharts"

interface IChartComponentProps {
  data: ITransaction[] | []
}


export const ChartComponent = ({data}:IChartComponentProps) => {

  const transformedData = data?.map(transaction => ({
    date: transaction?.date,
    amount: transaction?.amount,
    month: transaction?.date,
    value: transaction?.amount
  }));

  const chart = useChart({
    data: transformedData,
    series: [
      { name: "amount", color: "orange.500" },
    ],
  })

  return (
    <Chart.Root maxH='xl' w={'500px'} maxW={'100%'}  chart={chart}>
      <AreaChart data={chart.data}>
        <XAxis
          axisLine={true}
          tickLine={true}
          dataKey="date"
          tick={{ fontSize: 8, fill: "#DBDEE5" }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }}
        />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#FF8A65"
          strokeWidth={2}
          fill="url(#orangeGradient)"
          fillOpacity={1}
        />
        {/* <defs>
          <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF8A65" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#FF8A65" stopOpacity={0.1}/>
          </linearGradient>
        </defs> */}
      </AreaChart>
    </Chart.Root>
  )
}
