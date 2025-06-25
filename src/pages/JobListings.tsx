
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
  Loader2,
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
import { useJobs } from '@/hooks/useJobs';
import { calculateMatchScore, extractJobTags, formatRelativeTime, isJobNew } from '@/utils/jobHelpers';

const JobListings = () => {
  const { data: jobs, isLoading, error } = useJobs();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedSource, setSelectedSource] = React.useState('');
  const [sortBy, setSortBy] = React.useState('match');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    console.log('Removed filter:', filter);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
    setSelectedSource('');
    console.log('Cleared all filters');
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

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    console.log('Sort order:', sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const applyFilters = () => {
    console.log('Applying filters:', { searchTerm, selectedSource, sortBy, activeFilters });
    // TODO: Implement advanced filtering logic
  };

  const handleApplyToJob = (job: any) => {
    if (job.link) {
      window.open(job.link, '_blank');
    } else {
      console.log('No job link available for:', job.title);
    }
  };

  const handleTrackJob = (job: any) => {
    console.log('Tracking job:', job.title);
    // TODO: Implement job tracking functionality
  };

  const handleBookmarkJob = (job: any) => {
    console.log('Bookmarking job:', job.title);
    // TODO: Implement job bookmarking functionality
  };

  // Transform jobs data for JobCard component
  const transformedJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    let filteredJobs = jobs.map(job => ({
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

    // Apply search filter
    if (searchTerm.trim()) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply source filter
    if (selectedSource && selectedSource !== 'all') {
      filteredJobs = filteredJobs.filter(job => 
        job.source.toLowerCase().includes(selectedSource.toLowerCase())
      );
    }

    // Apply sorting
    filteredJobs.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'match':
          comparison = a.matchScore - b.matchScore;
          break;
        case 'date':
          // Sort by scraped_at or posted_at
          const aDate = new Date(jobs.find(j => j.id.toString() === a.id)?.scraped_at || jobs.find(j => j.id.toString() === a.id)?.posted_at || 0);
          const bDate = new Date(jobs.find(j => j.id.toString() === b.id)?.scraped_at || jobs.find(j => j.id.toString() === b.id)?.posted_at || 0);
          comparison = aDate.getTime() - bDate.getTime();
          break;
        case 'salary':
          // Basic salary comparison (this is simplified)
          const aSalary = a.salary ? parseInt(a.salary.replace(/[^\d]/g, '')) || 0 : 0;
          const bSalary = b.salary ? parseInt(b.salary.replace(/[^\d]/g, '')) || 0 : 0;
          comparison = aSalary - bSalary;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filteredJobs;
  }, [jobs, searchTerm, selectedSource, sortBy, sortOrder]);

  // Get unique sources for filter dropdown
  const availableSources = React.useMemo(() => {
    if (!jobs) return [];
    const sources = [...new Set(jobs.map(job => job.source).filter(Boolean))];
    return sources;
  }, [jobs]);

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">Error loading jobs</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
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
                {availableSources.map(source => (
                  <SelectItem key={source} value={source.toLowerCase()}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Score</SelectItem>
                <SelectItem value="date">Date Posted</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex-none" onClick={() => console.log('Advanced filters not implemented yet')}>
            <Filter className="mr-2 h-4 w-4" /> Advanced Filters
          </Button>
          
          <Button variant="default" className="flex-none" onClick={applyFilters}>
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active filters:</span>
          {searchTerm && (
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              Search: "{searchTerm}"
              <button 
                className="ml-1 hover:text-destructive font-bold" 
                onClick={() => setSearchTerm('')}
                aria-label="Remove search filter"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedSource && selectedSource !== 'all' && (
            <Badge 
              variant="outline" 
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              Source: {selectedSource}
              <button 
                className="ml-1 hover:text-destructive font-bold" 
                onClick={() => setSelectedSource('')}
                aria-label="Remove source filter"
              >
                ×
              </button>
            </Badge>
          )}
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
          {(activeFilters.length > 0 || searchTerm || (selectedSource && selectedSource !== 'all')) && (
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
          Showing <span className="font-medium">{transformedJobs.length}</span> of <span className="font-medium">{jobs?.length || 0}</span> jobs
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="ghost" size="sm" onClick={toggleSortOrder}>
            {sortBy === 'match' ? 'Match Score' : sortBy === 'date' ? 'Date Posted' : 'Salary'} 
            <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {transformedJobs.map((job) => (
              <JobCard 
                key={job.id} 
                {...job} 
                onApply={() => handleApplyToJob(job)}
                onTrack={() => handleTrackJob(job)}
                onBookmark={() => handleBookmarkJob(job)}
              />
            ))}
          </div>
          
          {transformedJobs.length > 0 && transformedJobs.length < (jobs?.length || 0) && (
            <div className="flex justify-center my-6">
              <Button 
                variant="outline" 
                className="w-full max-w-xs"
                onClick={() => console.log('Load more jobs functionality not implemented yet')}
              >
                Load more jobs <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
          
          {transformedJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search criteria or check back later
              </p>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default JobListings;
