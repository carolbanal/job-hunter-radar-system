
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const skillData = [
  { name: 'Python', value: 82 },
  { name: 'Web Scraping', value: 65 },
  { name: 'SQL', value: 48 },
  { name: 'JavaScript', value: 40 },
  { name: 'Machine Learning', value: 35 },
];

const sourceData = [
  { name: 'OnlineJobs.ph', value: 135 },
  { name: 'Indeed', value: 120 },
  { name: 'Remote OK', value: 75 },
  { name: 'We Work Remotely', value: 50 },
];

const COLORS = ['#6E59A5', '#9b87f5', '#0EA5E9', '#38BDF8', '#F97316'];

const trendData = [
  { month: 'Jan', jobs: 42, applications: 12 },
  { month: 'Feb', jobs: 55, applications: 16 },
  { month: 'Mar', jobs: 75, applications: 22 },
  { month: 'Apr', jobs: 65, applications: 19 },
  { month: 'May', jobs: 90, applications: 25 },
];

const locationData = [
  { location: 'Remote (Worldwide)', count: 145 },
  { location: 'Remote (US)', count: 95 },
  { location: 'Remote (Europe)', count: 75 },
  { location: 'Remote (APAC)', count: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Insights and stats for your job search</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380</div>
            <p className="text-xs text-muted-foreground">+24 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57</div>
            <p className="text-xs text-muted-foreground">15% application rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">40% response rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">52% interview rate</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>
              Job postings and applications over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="jobs" name="Jobs Found" stroke="#6E59A5" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="applications" name="Applications" stroke="#0EA5E9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Most requested skills in job listings
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={skillData}
                  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" name="Job Count" radius={[0, 4, 4, 0]}>
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Sources</CardTitle>
            <CardDescription>
              Distribution of jobs by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <CardDescription>
              Most common job locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {locationData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-sm font-medium">{item.location}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-purple h-2.5 rounded-full" 
                        style={{ width: `${(item.count / locationData[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View all locations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;
