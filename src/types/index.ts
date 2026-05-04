// Races API returns snake_case
export interface Session {
  session_key: number;
  circuit_short_name: string;
  country_code: string;
  country_name: string;
  date_start: string;
  date_end: string;
  session_name: string;
  session_type: string;
  year: number;
}

export interface RaceResult {
  position: number;
  driverNumber: number;
  fullName: string;
  nameAcronym: string;
  teamName: string;
  teamColour: string;
  gapToLeader: number;
  fastestLap: boolean;
  dnf: boolean;
  dns: boolean;
  dsq: boolean;
}

export interface DriverStanding {
  position: number;
  firstName: string;
  lastName: string;
  nameAcronym: string;
  headshotsUrl: string;
  points: number;
}

export interface TeamStanding {
  position: number;
  teamName: string;
  teamColour: string;
  points: number;
  drivers: { fullname: string; acronym: string; number: number }[];
}

export interface DriverStats {
  driverNumber: number;
  fullName: string;
  nameAcronym: string;
  teamName: string;
  totalPoints: number;
  racesEntered: number;
  wins: number;
  podiums: number;
  dnfs: number;
  bestFinish: number | null;
}

export interface DriverRacePoint {
  round: number;
  raceName: string;
  points: number;
  cumulative: number;
}
