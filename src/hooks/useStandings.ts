import { useQuery } from '@tanstack/react-query';
import { fetchDriverStandings, fetchTeamStandings } from '../api/standings';

export const useDriverStandings = (year: number) =>
  useQuery({
    queryKey: ['driverStandings', year],
    queryFn: () => fetchDriverStandings(year),
  });

export const useTeamStandings = (year: number) =>
  useQuery({
    queryKey: ['teamStandings', year],
    queryFn: () => fetchTeamStandings(year),
  });
