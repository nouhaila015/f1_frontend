import { useQuery } from '@tanstack/react-query';
import { fetchSeasonRaces, fetchRaceResults } from '../api/races';

export const useRaces = (year: number) =>
  useQuery({
    queryKey: ['races', year],
    queryFn: () => fetchSeasonRaces(year),
  });

export const useRaceResults = (sessionKey: number) =>
  useQuery({
    queryKey: ['raceResults', sessionKey],
    queryFn: () => fetchRaceResults(sessionKey),
    enabled: !!sessionKey,
  });
