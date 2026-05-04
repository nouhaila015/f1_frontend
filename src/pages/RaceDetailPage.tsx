import { useParams, Link } from 'react-router-dom';
import { useRaceResults } from '../hooks/useRaces';
import RaceResultsTable from '../components/races/RaceResultsTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function RaceDetailPage() {
  const { year, sessionKey } = useParams<{ year: string; sessionKey: string }>();
  const { data, isLoading, isError, error, refetch } = useRaceResults(Number(sessionKey));

  const winner = data?.[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/races/${year}`}
        className="text-sm text-gray-500 hover:text-red-600 transition-colors mb-6 inline-flex items-center gap-1"
      >
        ← {year} Season
      </Link>

      <div className="flex items-center justify-between mt-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Race Results</h1>
          {winner && (
            <p className="text-sm text-gray-500 mt-0.5">
              Winner: <span className="font-medium text-gray-700">{winner.fullName}</span>
              <span
                className="inline-block w-2 h-2 rounded-full mx-1.5 align-middle"
                style={{ backgroundColor: `#${winner.teamColour}` }}
              />
              {winner.teamName}
            </p>
          )}
        </div>
        {data && (
          <div className="text-sm text-gray-400">
            {data.filter(r => !r.dnf && !r.dns && !r.dsq).length} classified
            {data.some(r => r.dnf) && ` · ${data.filter(r => r.dnf).length} DNF`}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading && (
          <LoadingSpinner
            message="Syncing race results from OpenF1…"
            detail="This can take up to 3 minutes the first time."
          />
        )}
        {isError && (
          <ErrorMessage
            error={error}
            message="Failed to load race results."
            onRetry={() => refetch()}
          />
        )}
        {data && <RaceResultsTable results={data} />}
      </div>
    </div>
  );
}
