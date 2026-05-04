import { apiClient } from './client';
import type { Session, RaceResult } from '../types';

export const fetchSeasonRaces = (year: number) =>
  apiClient.get<Session[]>(`/races/${year}/season`).then(r => r.data);

export const fetchRaceResults = (sessionKey: number) =>
  apiClient.get<RaceResult[]>(`/races/${sessionKey}/results`).then(r => r.data);