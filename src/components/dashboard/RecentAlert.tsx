
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AlertProps {
  title: string;
  message: string;
  time: string;
  type: "job" | "application" | "insight";
  read?: boolean;
}

export function RecentAlert({ title, message, time, type, read = false }: AlertProps) {
  return (
    <Card
      className={cn(
        "p-4 border transition-colors cursor-pointer hover:bg-muted/50",
        !read && "border-l-4 border-l-orange"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h4 className="text-sm font-medium">{title}</h4>
            <Badge 
              variant="outline" 
              className={cn(
                "ml-2 text-xs",
                type === "job" && "bg-blue-light/10 text-blue-dark",
                type === "application" && "bg-purple-light/10 text-purple-dark",
                type === "insight" && "bg-orange-light/10 text-orange-dark"
              )}
            >
              {type === "job" && "New Job"}
              {type === "application" && "App Update"}
              {type === "insight" && "Insight"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
          {time}
        </span>
      </div>
    </Card>
  );
}
