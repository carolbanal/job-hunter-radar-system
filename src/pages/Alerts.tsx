
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  Plus,
  Mail,
  MessageSquare,
  Trash2,
  Edit,
  BellRing,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { RecentAlert } from '@/components/dashboard/RecentAlert';
import { Switch } from '@/components/ui/switch';

const alertHistory = [
  {
    title: 'New job match: Senior Python Developer',
    message: 'New job posting matches 92% of your profile with skills: Python, Web Scraping',
    time: '2h ago',
    type: 'job' as const,
  },
  {
    title: 'New job match: Data Engineer',
    message: 'New job posting matches 85% of your profile with skills: Python, PostgreSQL, ETL',
    time: '5h ago',
    type: 'job' as const,
  },
  {
    title: 'Application status updated',
    message: 'Your application for Data Analyst at Analytics Co moved to interview stage',
    time: '6h ago',
    type: 'application' as const,
  },
  {
    title: 'New job match: Machine Learning Engineer',
    message: 'New job posting matches 89% of your profile with skills: Python, TensorFlow, Machine Learning',
    time: 'Yesterday',
    type: 'job' as const,
    read: true,
  },
  {
    title: 'Insight: Python skills in high demand',
    message: '37% increase in job postings requiring Python skills in your target locations',
    time: '1d ago',
    type: 'insight' as const,
    read: true,
  },
];

const alertRules = [
  {
    id: 1,
    name: 'Python Developer Jobs',
    keywords: ['Python', 'Django', 'Flask'],
    locations: ['Remote', 'Remote (US)'],
    threshold: 75,
    channels: ['email', 'app'],
    active: true,
  },
  {
    id: 2,
    name: 'Data Science Positions',
    keywords: ['Data Science', 'Machine Learning', 'AI', 'TensorFlow'],
    locations: ['Remote (Worldwide)'],
    threshold: 80,
    channels: ['email', 'app', 'sms'],
    active: true,
  },
  {
    id: 3,
    name: 'DevOps Opportunities',
    keywords: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    locations: ['Remote (APAC)', 'Remote (US)'],
    threshold: 70,
    channels: ['app'],
    active: false,
  },
];

const Alerts = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Smart Alerts</h1>
          <p className="text-muted-foreground">Manage your job alerts and notifications</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Alert
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>
                Configure custom job matching alerts based on your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{rule.name}</h3>
                          {rule.active ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-muted text-muted-foreground">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {rule.keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary" className="bg-purple/10 text-purple">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {rule.locations.map((loc, i) => (
                            <Badge key={i} variant="secondary" className="bg-blue/10 text-blue">
                              {loc}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Match threshold: {rule.threshold}%
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {rule.channels.includes('email') && (
                            <div className="flex items-center text-xs bg-muted rounded-full px-2 py-0.5">
                              <Mail className="h-3 w-3 mr-1" /> Email
                            </div>
                          )}
                          {rule.channels.includes('app') && (
                            <div className="flex items-center text-xs bg-muted rounded-full px-2 py-0.5">
                              <BellRing className="h-3 w-3 mr-1" /> App
                            </div>
                          )}
                          {rule.channels.includes('sms') && (
                            <div className="flex items-center text-xs bg-muted rounded-full px-2 py-0.5">
                              <MessageSquare className="h-3 w-3 mr-1" /> SMS
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={rule.active} />
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Alert Rule
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive job alerts via email
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <BellRing className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label>App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive job alerts within the app
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive job alerts via SMS
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Your latest job matching notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertHistory.map((alert, index) => (
                  <RecentAlert key={index} {...alert} />
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View all alerts
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alert Statistics</CardTitle>
              <CardDescription>
                Alert performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Alerts sent this week</span>
                  </div>
                  <Badge variant="secondary">24</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange mr-2" />
                    <span className="text-sm">Alerts clicked</span>
                  </div>
                  <Badge variant="secondary">14</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellRing className="h-4 w-4 text-purple mr-2" />
                    <span className="text-sm">Applications from alerts</span>
                  </div>
                  <Badge variant="secondary">8</Badge>
                </div>
                
                <div className="pt-2 text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Alert efficiency</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple h-2 rounded-full" style={{ width: "58%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Alerts;
