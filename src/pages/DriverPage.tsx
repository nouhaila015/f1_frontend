import { useParams, Link } from 'react-router-dom';
import { useDriverStats, useDriverRaceHistory } from '../hooks/useDriverStats';
import DriverStatsView from '../components/drivers/DriverStatsView';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function DriverPage() {
  const { driverNumber, year } = useParams<{ driverNumber: string; year: string }>();
  const num = Number(driverNumber);
  const yr = Number(year);

  const stats = useDriverStats(num, yr);
  const history = useDriverRaceHistory(num, yr);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to={`/standings/${year}`}
        className="text-sm text-gray-500 hover:text-red-600 transition-colors mb-6 inline-flex items-center gap-1"
      >
        ← {year} Standings
      </Link>

      {stats.isLoading && <LoadingSpinner />}

      {stats.isError && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-4xl mb-3">🔧</p>
          <p className="font-semibold text-gray-700">Driver stats not available yet</p>
          <p className="text-sm text-gray-400 mt-1">
            The <code className="bg-gray-100 px-1 rounded">/api/drivers</code> endpoint hasn't been implemented on the backend.
          </p>
        </div>
      )}

      {stats.data && (
        <>
          <div className="flex items-center gap-4 mt-2 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{stats.data.fullName}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {stats.data.teamName}
                <span className="mx-2 text-gray-300">·</span>
                #{stats.data.driverNumber}
                <span className="mx-2 text-gray-300">·</span>
                {year}
              </p>
            </div>
          </div>
          <DriverStatsView stats={stats.data} history={history.data} />
        </>
      )}
    </div>
  );
}
