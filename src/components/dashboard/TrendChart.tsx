
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { date: 'May 14', jobs: 42 },
  { date: 'May 15', jobs: 47 },
  { date: 'May 16', jobs: 55 },
  { date: 'May 17', jobs: 53 },
  { date: 'May 18', jobs: 60 },
  { date: 'May 19', jobs: 58 },
  { date: 'May 20', jobs: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{`Jobs found: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Posting Trends</CardTitle>
        <CardDescription>
          Daily tracking of new job postings matching your criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#6E59A5"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6E59A5" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
