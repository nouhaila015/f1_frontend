import { apiClient } from './client';
import type { DriverStats, DriverRacePoint } from '../types';

export const fetchDriverStats = (driverNumber: number, year: number): Promise<DriverStats> =>
  apiClient.get<DriverStats>(`/drivers/${driverNumber}/${year}`).then(r => r.data);

export const fetchDriverRaceHistory = (driverNumber: number, year: number): Promise<DriverRacePoint[]> =>
  apiClient.get<DriverRacePoint[]>(`/drivers/${driverNumber}/${year}/history`).then(r => r.data);
