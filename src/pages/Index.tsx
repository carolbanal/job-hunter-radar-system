
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { JobCard } from '@/components/dashboard/JobCard';
import { ApplicationsChart } from '@/components/dashboard/ApplicationsChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { RecentAlert } from '@/components/dashboard/RecentAlert';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  Briefcase,
  CheckCircle2,
  Clock,
  Filter,
  Sparkles,
} from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Python Developer',
    company: 'TechCorp Inc',
    location: 'Remote',
    salary: '$80K - $120K',
    description: 'We are seeking an experienced Python developer with expertise in web scraping, data processing, and building automated systems. The ideal candidate will have...',
    tags: ['Python', 'Web Scraping', 'API Development', 'Pandas'],
    source: 'OnlineJobs.ph',
    postedAt: '2 hours ago',
    matchScore: 92,
    isNew: true,
  },
  {
    id: '2',
    title: 'Data Engineer',
    company: 'DataFlow Systems',
    location: 'Remote (US)',
    salary: '$90K - $130K',
    description: 'Looking for a skilled Data Engineer to join our team to build and maintain data pipelines, implement ETL processes, and develop data models...',
    tags: ['Python', 'PostgreSQL', 'ETL', 'AWS'],
    source: 'RemoteOK',
    postedAt: '5 hours ago',
    matchScore: 85,
    isNew: true,
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions Ltd',
    location: 'Remote (APAC)',
    description: 'Join our dynamic team to build responsive web applications using React on the frontend and Python/Django on the backend. Experience with API integration...',
    tags: ['React', 'Python', 'Django', 'REST API'],
    source: 'We Work Remotely',
    postedAt: 'Yesterday',
    matchScore: 78,
  },
];

const alerts = [
  {
    title: 'New job match: Senior Python Developer',
    message: 'New job posting matches 92% of your profile with skills: Python, Web Scraping',
    time: '2h ago',
    type: 'job' as const,
  },
  {
    title: 'Application status updated',
    message: 'Your application for Data Analyst at Analytics Co moved to interview stage',
    time: '6h ago',
    type: 'application' as const,
  },
  {
    title: 'Insight: Python skills in high demand',
    message: '37% increase in job postings requiring Python skills in your target locations',
    time: '1d ago',
    type: 'insight' as const,
    read: true,
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your job hunt progress and opportunities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hidden md:flex">
            <Clock className="mr-2 h-4 w-4" /> Last scrape: 2 hours ago
          </Button>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" /> Refresh Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Jobs Found"
          value="380"
          change="+24 since yesterday"
          trend="up"
          icon={<Briefcase size={24} />}
          className="stat-card-gradient-1"
        />
        <StatCard 
          title="Applications Submitted"
          value="57"
          change="+3 this week"
          trend="up"
          icon={<CheckCircle2 size={24} />}
          className="stat-card-gradient-2"
        />
        <StatCard 
          title="Interview Rate"
          value="23%"
          change="+5% from last month"
          trend="up"
          icon={<BarChart3 size={24} />}
          className="stat-card-gradient-3"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ApplicationsChart />
        <TrendChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Job Matches</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Alerts</h2>
            <Button variant="ghost" size="sm">
              <BellRing className="mr-2 h-4 w-4" /> Manage Alerts
            </Button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <RecentAlert key={index} {...alert} />
            ))}
            <Button variant="outline" className="w-full mt-2">
              View all alerts
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
