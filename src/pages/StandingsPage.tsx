import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDriverStandings, useTeamStandings } from '../hooks/useStandings';
import DriverStandingsTable from '../components/standings/DriverStandingsTable';
import TeamStandingsTable from '../components/standings/TeamStandingsTable';
import YearSelector from '../components/ui/YearSelector';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

type Tab = 'drivers' | 'teams';

export default function StandingsPage() {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const currentYear = Number(year) || new Date().getFullYear();
  const [tab, setTab] = useState<Tab>('drivers');

  const drivers = useDriverStandings(currentYear);
  const teams = useTeamStandings(currentYear);

  const active = tab === 'drivers' ? drivers : teams;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentYear} Championship</h1>
          <p className="text-sm text-gray-500 mt-0.5">Formula 1 standings</p>
        </div>
        <YearSelector year={currentYear} onChange={(y) => navigate(`/standings/${y}`)} />
      </div>

      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
        {(['drivers', 'teams'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === t ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'drivers' ? 'Drivers' : 'Constructors'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {active.isLoading && (
          <LoadingSpinner
            message={`Syncing ${currentYear} standings from OpenF1…`}
            detail="This can take up to 3 minutes the first time."
          />
        )}
        {active.isError && (
          <ErrorMessage
            error={active.error}
            message={`Failed to load ${currentYear} standings.`}
            onRetry={() => active.refetch()}
          />
        )}
        {tab === 'drivers' && drivers.data && (
          <DriverStandingsTable standings={drivers.data} year={currentYear} />
        )}
        {tab === 'teams' && teams.data && (
          <TeamStandingsTable standings={teams.data} />
        )}
      </div>
    </div>
  );
}
