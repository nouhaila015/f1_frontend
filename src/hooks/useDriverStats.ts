import { useQuery } from '@tanstack/react-query';
import { fetchDriverStats, fetchDriverRaceHistory } from '../api/drivers';

export const useDriverStats = (driverNumber: number, year: number) =>
  useQuery({
    queryKey: ['driverStats', driverNumber, year],
    queryFn: () => fetchDriverStats(driverNumber, year),
    enabled: !!driverNumber && !!year,
  });

export const useDriverRaceHistory = (driverNumber: number, year: number) =>
  useQuery({
    queryKey: ['driverRaceHistory', driverNumber, year],
    queryFn: () => fetchDriverRaceHistory(driverNumber, year),
    enabled: !!driverNumber && !!year,
  });
