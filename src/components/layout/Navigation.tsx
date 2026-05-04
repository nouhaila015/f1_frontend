import { NavLink } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

const links = [
  { to: '/', label: 'Home' },
  { to: `/races/${CURRENT_YEAR}`, label: 'Races', matchPrefix: '/races' },
  { to: `/standings/${CURRENT_YEAR}`, label: 'Standings', matchPrefix: '/standings' },
];

export default function Navigation() {
  return (
    <nav className="flex gap-6 text-sm font-medium">
      {links.map(({ to, label, matchPrefix }) => (
        <NavLink
          key={label}
          to={to}
          end={!matchPrefix}
          className={({ isActive }) => {
            const active = isActive || (matchPrefix && location.pathname.startsWith(matchPrefix));
            return active
              ? 'text-white underline underline-offset-4'
              : 'text-red-100 hover:text-white transition-colors';
          }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
