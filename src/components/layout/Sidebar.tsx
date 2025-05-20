
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Briefcase, 
  BarChart,
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Database,
  Bot
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isOpen: boolean;
}

const NavItem = ({ icon: Icon, label, to, isOpen }: NavItemProps) => (
  <NavLink 
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center py-2 px-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
        isActive && "sidebar-link-active"
      )
    }
  >
    <Icon className="h-5 w-5 min-w-5" />
    {isOpen && <span className="ml-3">{label}</span>}
  </NavLink>
);

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex-shrink-0 border-r overflow-y-auto transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center h-16 px-4">
        {isOpen ? (
          <h1 className="text-xl font-bold text-purple-light">JobTrackr</h1>
        ) : (
          <h1 className="text-xl font-bold text-purple-light mx-auto">JT</h1>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto p-1 rounded-full hover:bg-muted"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <Separator />
      
      <nav className="p-2 space-y-1">
        <NavItem icon={LayoutDashboard} label="Dashboard" to="/" isOpen={isOpen} />
        <NavItem icon={Briefcase} label="Job Listings" to="/jobs" isOpen={isOpen} />
        <NavItem icon={BarChart} label="Analytics" to="/analytics" isOpen={isOpen} />
        <NavItem icon={Bell} label="Alerts" to="/alerts" isOpen={isOpen} />
      </nav>
      
      <Separator className="my-2" />
      
      <div className="p-2">
        <h2 className={cn("text-xs font-semibold px-3 py-1 text-sidebar-foreground/60", !isOpen && "sr-only")}>
          DATA SOURCES
        </h2>
        <nav className="mt-1 space-y-1">
          <NavItem icon={Globe} label="OnlineJobs.ph" to="/sources/onlinejobs" isOpen={isOpen} />
          <NavItem icon={Globe} label="Indeed" to="/sources/indeed" isOpen={isOpen} />
          <NavItem icon={Globe} label="Remote OK" to="/sources/remoteok" isOpen={isOpen} />
          <NavItem icon={Globe} label="We Work Remotely" to="/sources/wwr" isOpen={isOpen} />
        </nav>
      </div>
      
      <Separator className="my-2" />
      
      <div className="p-2">
        <h2 className={cn("text-xs font-semibold px-3 py-1 text-sidebar-foreground/60", !isOpen && "sr-only")}>
          TOOLS
        </h2>
        <nav className="mt-1 space-y-1">
          <NavItem icon={Database} label="Stored Jobs" to="/tools/stored" isOpen={isOpen} />
          <NavItem icon={Bot} label="AI Assistant" to="/tools/ai" isOpen={isOpen} />
          <NavItem icon={Settings} label="Settings" to="/settings" isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
}
