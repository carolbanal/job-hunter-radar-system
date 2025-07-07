
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// For now, using zero data as requested until real application tracking is implemented
const data = [
  { name: 'Applied', value: 0, fill: '#6E59A5' },
  { name: 'Phone Screen', value: 0, fill: '#9b87f5' },
  { name: 'Interview', value: 0, fill: '#0EA5E9' },
  { name: 'Final Round', value: 0, fill: '#38BDF8' },
  { name: 'Offer', value: 0, fill: '#F97316' },
  { name: 'Accepted', value: 0, fill: '#FB923C' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function ApplicationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Pipeline</CardTitle>
        <CardDescription>
          Track your application progress through different stages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" barSize={45} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {data.every(item => item.value === 0) && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No applications tracked yet. Start applying to jobs to see your pipeline progress.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
