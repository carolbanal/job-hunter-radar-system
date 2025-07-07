
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
      console.log('Fetching jobs from Supabase...');
      
      // First, get the total count
      const { count } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });
      
      console.log('Total jobs in database:', count);
      
      // Then fetch all jobs without limit
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('scraped_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
      
      console.log('Jobs fetched successfully:', data?.length || 0);
      return data as Job[];
    },
  });
};
