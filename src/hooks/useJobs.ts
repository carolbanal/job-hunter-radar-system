
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Job {
  id: number;
  title: string | null;
  company: string | null;
  location: string | null;
  salary: string | null;
  description: string | null;
  source: string | null;
  posted_at: string | null;
  scraped_at: string | null;
  link: string | null;
  query: string | null;
}

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('scraped_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
      
      return data as Job[];
    },
  });
};
