
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockSalesTrendData } from "@/data/mockData";

interface SalesTrendChartProps {
  data?: { name: string; sales: number }[];
  lineColor?: string; // Tailwind color class e.g., "stroke-blue-500"
}

export const SalesTrendChart = ({ data = mockSalesTrendData, lineColor = "stroke-primary" }: SalesTrendChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>Monthly sales performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]} />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Line type="monotone" dataKey="sales" className={lineColor} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
