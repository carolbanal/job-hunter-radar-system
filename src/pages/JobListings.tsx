
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { JobCard } from '@/components/dashboard/JobCard';
import { Button } from '@/components/ui/button';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Extended mock data
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
  {
    id: '4',
    title: 'Machine Learning Engineer',
    company: 'AI Innovations',
    location: 'Remote (Worldwide)',
    salary: '$100K - $150K',
    description: 'We\'re looking for a Machine Learning Engineer to help develop and deploy ML models. You\'ll work with large datasets and implement algorithms...',
    tags: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
    source: 'Indeed',
    postedAt: 'Yesterday',
    matchScore: 89,
    isNew: true,
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'Insight Analytics',
    location: 'Remote (Europe)',
    salary: '$60K - $80K',
    description: 'Seeking a Data Analyst to transform raw data into actionable insights. You\'ll be responsible for analyzing data, creating reports, and presenting findings...',
    tags: ['Python', 'SQL', 'Data Visualization', 'Excel'],
    source: 'OnlineJobs.ph',
    postedAt: '2 days ago',
    matchScore: 76,
  },
  {
    id: '6',
    title: 'Python Backend Developer',
    company: 'ServerTech Solutions',
    location: 'Remote (US)',
    salary: '$85K - $110K',
    description: 'Join our backend team to develop and maintain scalable web services and APIs. You\'ll work with Python, Django, and databases to create robust solutions...',
    tags: ['Python', 'Django', 'PostgreSQL', 'REST API'],
    source: 'We Work Remotely',
    postedAt: '2 days ago',
    matchScore: 82,
  },
];

const JobListings = () => {
  const [activeFilters, setActiveFilters] = React.useState([
    "Python", "Remote", "Match > 70%"
  ]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedSource, setSelectedSource] = React.useState('');
  const [sortBy, setSortBy] = React.useState('match');
  
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
    setSelectedSource('');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log('Search term:', value);
  };

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
    console.log('Selected source:', value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log('Sort by:', value);
  };
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <p className="text-muted-foreground">Browse and filter job opportunities</p>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4 flex-1">
            <Select value={selectedSource} onValueChange={handleSourceChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Job Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="onlinejobs">OnlineJobs.ph</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="remoteok">Remote OK</SelectItem>
                <SelectItem value="wwr">We Work Remotely</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Score</SelectItem>
                <SelectItem value="date">Date Posted</SelectItem>
                <SelectItem value="salary">Salary (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex-none">
            <Filter className="mr-2 h-4 w-4" /> Advanced Filters
          </Button>
          
          <Button variant="default" className="flex-none">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              {filter}
              <button 
                className="ml-1 hover:text-destructive font-bold" 
                onClick={() => removeFilter(filter)}
                aria-label={`Remove ${filter} filter`}
              >
                ×
              </button>
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">380</span> jobs
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="ghost" size="sm" onClick={() => console.log('Toggle sort order')}>
            Match Score <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
        
        <div className="flex justify-center my-6">
          <Button 
            variant="outline" 
            className="w-full max-w-xs"
            onClick={() => console.log('Load more jobs')}
          >
            Load more jobs <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobListings;
