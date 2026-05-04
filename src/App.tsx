import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import RacesPage from './pages/RacesPage';
import RaceDetailPage from './pages/RaceDetailPage';
import StandingsPage from './pages/StandingsPage';
import DriverPage from './pages/DriverPage';

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/races" element={<Navigate to={`/races/${CURRENT_YEAR}`} replace />} />
          <Route path="/races/:year" element={<RacesPage />} />
          <Route path="/races/:year/:sessionKey" element={<RaceDetailPage />} />
          <Route path="/standings" element={<Navigate to={`/standings/${CURRENT_YEAR}`} replace />} />
          <Route path="/standings/:year" element={<StandingsPage />} />
          <Route path="/drivers/:driverNumber/:year" element={<DriverPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
