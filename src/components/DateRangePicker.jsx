export default function DateRangePicker({ from, to, onFromChange, onToChange, onSet, loading }) {
  return (
    <div className="date-range">
      <label className="date-field">
        <span>from</span>
        <input
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </label>

      <label className="date-field">
        <span>to</span>
        <input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
        />
      </label>

      <button type="button" className="set-btn" onClick={onSet} disabled={loading}>
        {loading ? 'Loading…' : 'set'}
      </button>
    </div>
  );
}
