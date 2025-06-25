
import React from 'react';
import { Bell, Menu, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-background">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="hidden md:flex max-w-md w-full">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="w-full pl-9 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-orange rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <div className="flex justify-between items-center px-3 py-2 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm" className="text-xs text-purple">Mark all read</Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">New job match: Senior Python Developer</p>
                  <p className="text-xs text-muted-foreground">Keywords match: Python, Web Scraping</p>
                  <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">New job match: Data Engineer</p>
                  <p className="text-xs text-muted-foreground">Keywords match: Python, PostgreSQL</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">Application status update</p>
                  <p className="text-xs text-muted-foreground">Your application for Full Stack Developer has moved to interview stage</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t">
              <Button variant="outline" className="w-full">View all notifications</Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-purple text-white">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              {user?.email}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
