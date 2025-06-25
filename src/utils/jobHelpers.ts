
import { Job } from '@/hooks/useJobs';

// Helper function to calculate match score (placeholder logic)
export const calculateMatchScore = (job: Job): number => {
  // Simple scoring based on presence of key fields
  let score = 0;
  if (job.title) score += 20;
  if (job.company) score += 20;
  if (job.location) score += 15;
  if (job.salary) score += 15;
  if (job.description) score += 20;
  if (job.source) score += 10;
  
  // Add bonus for Python/tech-related keywords
  const techKeywords = ['python', 'developer', 'engineer', 'tech', 'software', 'data'];
  const content = `${job.title} ${job.description}`.toLowerCase();
  const keywordMatches = techKeywords.filter(keyword => content.includes(keyword)).length;
  score += keywordMatches * 5;
  
  return Math.min(score, 100);
};

// Helper to format job tags from description
export const extractJobTags = (job: Job): string[] => {
  const description = job.description?.toLowerCase() || '';
  const title = job.title?.toLowerCase() || '';
  const allText = `${title} ${description}`;
  
  const commonTags = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'PostgreSQL', 
    'AWS', 'Docker', 'Git', 'Django', 'Flask', 'API', 'REST', 'GraphQL',
    'Machine Learning', 'Data Science', 'AI', 'TensorFlow', 'PyTorch',
    'Remote', 'Full-time', 'Part-time', 'Contract', 'Senior', 'Junior'
  ];
  
  return commonTags.filter(tag => 
    allText.includes(tag.toLowerCase())
  ).slice(0, 4); // Limit to 4 tags
};

// Helper to format relative time
export const formatRelativeTime = (dateString: string | null): string => {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  
  return date.toLocaleDateString();
};

// Helper to determine if job is new (within 24 hours)
export const isJobNew = (dateString: string | null): boolean => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  return diffInHours <= 24;
};
