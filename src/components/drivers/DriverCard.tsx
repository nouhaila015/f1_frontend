import { Link } from 'react-router-dom';
import type { DriverStanding } from '../../types';

interface Props {
  driver: DriverStanding;
  year: number;
}

export default function DriverCard({ driver, year }: Props) {
  return (
    <Link
      to={`/drivers/${driver.nameAcronym}/${year}`}
      className="block rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <p className="text-lg font-semibold">{driver.firstName} {driver.lastName}</p>
      <p className="text-sm text-gray-400">{driver.nameAcronym}</p>
      <p className="mt-2 text-sm font-medium">{driver.points} pts</p>
    </Link>
  );
}
