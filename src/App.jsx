import { useState } from 'react';
import DateRangePicker from './components/DateRangePicker.jsx';
import SummaryTable from './components/SummaryTable.jsx';
import { fetchSentCounts } from './api.js';
import './App.css';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoISO(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export default function App() {
  const [from, setFrom] = useState(daysAgoISO(4));
  const [to, setTo] = useState(todayISO());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSet() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSentCounts(from, to);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Email Outbox Analytics</h1>
      </header>

      <DateRangePicker
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        onSet={handleSet}
        loading={loading}
      />

      {error && <p className="error">{error}</p>}

      <SummaryTable data={data} loading={loading} />
    </div>
  );
}
