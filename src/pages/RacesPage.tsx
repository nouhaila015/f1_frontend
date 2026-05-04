import { useParams, useNavigate } from 'react-router-dom';
import { useRaces } from '../hooks/useRaces';
import RaceList from '../components/races/RaceList';
import YearSelector from '../components/ui/YearSelector';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function RacesPage() {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const currentYear = Number(year) || new Date().getFullYear();
  const { data, isLoading, isError, error, refetch } = useRaces(currentYear);

  const roundCount = data ? new Set(data.map(s => s.circuit_short_name)).size : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentYear} Season</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {roundCount != null ? `${roundCount} rounds` : 'Formula 1 calendar'}
          </p>
        </div>
        <YearSelector year={currentYear} onChange={(y) => navigate(`/races/${y}`)} />
      </div>

      {isLoading && (
        <LoadingSpinner
          message={`Syncing ${currentYear} season data from OpenF1…`}
          detail="This can take up to 3 minutes the first time."
        />
      )}
      {isError && (
        <ErrorMessage
          error={error}
          message={`Failed to load ${currentYear} races.`}
          onRetry={() => refetch()}
        />
      )}
      {data && <RaceList sessions={data} year={currentYear} />}
    </div>
  );
}
