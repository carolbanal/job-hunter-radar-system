
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, ExternalLink, MapPin, Building } from 'lucide-react';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  tags: string[];
  source: string;
  postedAt: string;
  matchScore: number;
  isNew?: boolean;
  isSaved?: boolean;
  className?: string;
  link?: string | null;
  onApply?: () => void;
  onTrack?: () => void;
  onBookmark?: () => void;
  onClick?: () => void;
}

export function JobCard({
  title,
  company,
  location,
  salary,
  description,
  tags,
  source,
  postedAt,
  matchScore,
  isNew = false,
  isSaved = false,
  className,
  link,
  onApply,
  onTrack,
  onBookmark,
  onClick,
}: JobCardProps) {
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApply) {
      onApply();
    } else if (link) {
      window.open(link, '_blank');
    } else {
      console.log('No apply action or link available');
    }
  };

  const handleTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTrack) {
      onTrack();
    } else {
      console.log('Track functionality not implemented yet');
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmark) {
      onBookmark();
    } else {
      console.log('Bookmark functionality not implemented yet');
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Job details view not implemented yet');
      // TODO: Implement job details modal or page
    }
  };

  return (
    <div 
      className={cn(
        "p-5 border rounded-xl job-card-gradient transition-shadow hover:shadow-md cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold text-lg">{title}</h3>
            {isNew && (
              <Badge variant="secondary" className="ml-2 bg-blue-light text-white">New</Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Building className="h-3.5 w-3.5 mr-1" />
            <span>{company}</span>
            <span className="mx-1.5">•</span>
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <div className={cn(
              "text-xs font-medium",
              matchScore >= 80 ? "text-green-600" : 
              matchScore >= 60 ? "text-blue" : "text-orange"
            )}>
              Match Score
            </div>
            <div className="text-lg font-bold">{matchScore}%</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(isSaved && "text-purple")}
            onClick={handleBookmark}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {salary && (
        <div className="mt-3">
          <Badge variant="outline" className="bg-muted/50">
            {salary}
          </Badge>
        </div>
      )}
      
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
      
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <span>Source: {source}</span>
          <span className="mx-1.5">•</span>
          <span>{postedAt}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleTrack}>
            Track
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
