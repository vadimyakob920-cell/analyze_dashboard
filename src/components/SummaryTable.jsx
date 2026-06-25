export default function SummaryTable({ data, loading }) {
  if (!data && !loading) {
    return (
      <p className="hint">Select a date range and click <strong>set</strong> to load sent counts.</p>
    );
  }

  const services = data?.services ?? [];

  function formatReply(count, rate) {
    const n = count ?? 0;
    const pct = rate ?? 0;
    return `${n}(${pct}%)`;
  }

  function rateOf(count, sent) {
    const n = count ?? 0;
    const s = sent ?? 0;
    return s === 0 ? 0 : Math.round((n / s) * 1000) / 10;
  }

  function portalCount(service) {
    return (data?.easy_reply?.byService?.[service] ?? 0) + (data?.full_reply?.byService?.[service] ?? 0);
  }

  const portalTotal =
    (data?.easy_reply?.total ?? 0) + (data?.full_reply?.total ?? 0);

  return (
    <div className="table-wrap">
      <table className="summary-table">
        <thead>
          <tr>
            <th />
            {services.map((service) => (
              <th key={service}>{service}</th>
            ))}
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>sent</th>
            {services.map((service) => (
              <td key={service}>{data?.sent?.byService?.[service] ?? 0}</td>
            ))}
            <td>{data?.sent?.total ?? 0}</td>
          </tr>
          <tr>
            <th>message_reply</th>
            {services.map((service) => (
              <td key={service}>
                {formatReply(
                  data?.reply?.byService?.[service],
                  data?.rate?.byService?.[service]
                )}
              </td>
            ))}
            <td>{formatReply(data?.reply?.total, data?.rate?.total)}</td>
          </tr>
          <tr>
            <th>portal_reply</th>
            {services.map((service) => (
              <td key={service}>
                {formatReply(
                  portalCount(service),
                  rateOf(portalCount(service), data?.sent?.byService?.[service])
                )}
              </td>
            ))}
            <td>{formatReply(portalTotal, rateOf(portalTotal, data?.sent?.total))}</td>
          </tr>
          <tr>
            <th>easy_reply</th>
            {services.map((service) => (
              <td key={service}>
                {formatReply(
                  data?.easy_reply?.byService?.[service],
                  rateOf(data?.easy_reply?.byService?.[service], data?.sent?.byService?.[service])
                )}
              </td>
            ))}
            <td>
              {formatReply(data?.easy_reply?.total, rateOf(data?.easy_reply?.total, data?.sent?.total))}
            </td>
          </tr>
          <tr>
            <th>full_reply</th>
            {services.map((service) => (
              <td key={service}>
                {formatReply(
                  data?.full_reply?.byService?.[service],
                  rateOf(data?.full_reply?.byService?.[service], data?.sent?.byService?.[service])
                )}
              </td>
            ))}
            <td>
              {formatReply(data?.full_reply?.total, rateOf(data?.full_reply?.total, data?.sent?.total))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
