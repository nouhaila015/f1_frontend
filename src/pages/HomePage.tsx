import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YearSelector from '../components/ui/YearSelector';

const CARDS = [
  {
    title: 'Races',
    description: 'Full calendar, session schedule, and race results.',
    path: (year: number) => `/races/${year}`,
    icon: '🏁',
    color: 'from-red-500 to-red-700',
  },
  {
    title: 'Standings',
    description: 'Driver championship and constructor standings.',
    path: (year: number) => `/standings/${year}`,
    icon: '🏆',
    color: 'from-gray-700 to-gray-900',
  },
];

export default function HomePage() {
  const [year, setYear] = useState(2024);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Formula 1 Dashboard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3">
          Every race.<br className="hidden sm:block" /> Every driver. Every lap.
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Live F1 data — standings, results, and driver stats in one place.
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Season</span>
          <YearSelector year={year} onChange={setYear} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {CARDS.map(({ title, description, path, icon, color }) => (
          <button
            key={title}
            onClick={() => navigate(path(year))}
            className={`bg-gradient-to-br ${color} text-white rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform shadow-sm`}
          >
            <span className="text-3xl mb-3 block">{icon}</span>
            <h2 className="text-xl font-bold mb-1">{title}</h2>
            <p className="text-sm opacity-75">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
