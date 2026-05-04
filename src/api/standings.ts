import { apiClient } from './client';
import type { DriverStanding, TeamStanding } from '../types';

export const fetchDriverStandings = (year: number): Promise<DriverStanding[]> =>
  apiClient.get<DriverStanding[]>(`/standings/${year}/drivers`).then(r => r.data);

export const fetchTeamStandings = (year: number): Promise<TeamStanding[]> =>
  apiClient.get<TeamStanding[]>(`/standings/${year}/teams`).then(r => r.data);
