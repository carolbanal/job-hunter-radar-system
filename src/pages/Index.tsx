
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
  Loader2,
} from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { calculateMatchScore, extractJobTags, formatRelativeTime, isJobNew } from '@/utils/jobHelpers';

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
  const { data: jobs, isLoading, error, refetch } = useJobs();

  // Transform jobs data for JobCard component
  const transformedJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    return jobs.map(job => ({
      id: job.id.toString(),
      title: job.title || 'Untitled Position',
      company: job.company || 'Unknown Company',
      location: job.location || 'Location not specified',
      salary: job.salary || undefined,
      description: job.description || 'No description available',
      tags: extractJobTags(job),
      source: job.source || 'Unknown Source',
      postedAt: formatRelativeTime(job.posted_at || job.scraped_at),
      matchScore: calculateMatchScore(job),
      isNew: isJobNew(job.posted_at || job.scraped_at),
      link: job.link,
    }));
  }, [jobs]);

  // Get top 3 most recent jobs with highest match scores
  const topJobs = React.useMemo(() => {
    return transformedJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [transformedJobs]);

  // Calculate stats from real data
  const totalJobs = jobs?.length || 0;
  const highMatchJobs = transformedJobs.filter(job => job.matchScore >= 75).length;
  const newJobsToday = transformedJobs.filter(job => job.isNew).length;
  
  // Get latest scrape time
  const latestScrapeTime = React.useMemo(() => {
    if (!jobs || jobs.length === 0) return 'Never';
    const latestJob = jobs.reduce((latest, job) => {
      const jobTime = new Date(job.scraped_at || job.posted_at || 0);
      const latestTime = new Date(latest.scraped_at || latest.posted_at || 0);
      return jobTime > latestTime ? job : latest;
    });
    return formatRelativeTime(latestJob.scraped_at || latestJob.posted_at);
  }, [jobs]);

  const handleRefreshData = async () => {
    console.log('Refreshing job data...');
    await refetch();
  };

  const handleApplyToJob = (job: typeof topJobs[0]) => {
    if (job.link) {
      window.open(job.link, '_blank');
    } else {
      console.log('No job link available for:', job.title);
    }
  };

  const handleTrackJob = (job: typeof topJobs[0]) => {
    console.log('Tracking job:', job.title);
    // TODO: Implement job tracking functionality
  };

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading dashboard data</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
            <Button onClick={handleRefreshData} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your job hunt progress and opportunities</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="hidden md:flex">
            <Clock className="mr-2 h-4 w-4" /> Last scrape: {latestScrapeTime}
          </Button>
          <Button onClick={handleRefreshData} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Refresh Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Jobs Found"
          value={totalJobs.toString()}
          change={`+${newJobsToday} new today`}
          trend="up"
          icon={<Briefcase size={24} />}
          className="stat-card-gradient-1"
        />
        <StatCard 
          title="High Match Jobs"
          value={highMatchJobs.toString()}
          change={`${Math.round((highMatchJobs / totalJobs) * 100) || 0}% of total`}
          trend="up"
          icon={<CheckCircle2 size={24} />}
          className="stat-card-gradient-2"
        />
        <StatCard 
          title="New Jobs Today"
          value={newJobsToday.toString()}
          change="In the last 24 hours"
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
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/jobs'}>
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading recent job matches...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {topJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  {...job} 
                  onApply={() => handleApplyToJob(job)}
                  onTrack={() => handleTrackJob(job)}
                />
              ))}
              {topJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No job matches found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try refreshing the data or check back later
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Alerts</h2>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/alerts'}>
              <BellRing className="mr-2 h-4 w-4" /> Manage Alerts
            </Button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <RecentAlert key={index} {...alert} />
            ))}
            <Button variant="outline" className="w-full mt-2" onClick={() => window.location.href = '/alerts'}>
              View all alerts
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
