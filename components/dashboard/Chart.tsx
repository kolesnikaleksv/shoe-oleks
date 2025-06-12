'use client';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface IAppProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

const aggregateData = (
  data: IAppProps['data']
): { date: string; revenue: number }[] => {
  const aggregated: Record<string, number> = {};

  data.forEach((curr) => {
    aggregated[curr.date] = (aggregated[curr.date] || 0) + curr.revenue;
  });

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

export default function Chart({ data }: IAppProps) {
  const processedData = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
