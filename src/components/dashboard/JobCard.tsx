
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
}: JobCardProps) {
  return (
    <div className={cn(
      "p-5 border rounded-xl job-card-gradient transition-shadow hover:shadow-md",
      className
    )}>
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
      
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="bg-background">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <span>Source: {source}</span>
          <span className="mx-1.5">•</span>
          <span>{postedAt}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Track
          </Button>
          <Button size="sm">
            Apply <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
