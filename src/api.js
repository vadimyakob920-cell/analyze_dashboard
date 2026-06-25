const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'https://analyze-backend-bahh.onrender.com'
).replace(/\/$/, '');

const REQUEST_TIMEOUT_MS = 120000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchSentCounts(from, to) {
  const params = new URLSearchParams({ from, to });
  const url = `${API_BASE_URL}/api/sent?${params}`;

  let res;
  try {
    res = await fetchWithTimeout(url);
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'Request timed out. Render free tier may be waking up — wait a minute and try again.'
      );
    }
    throw new Error(
      `Cannot reach backend at ${API_BASE_URL}. Check that the Render service is running, then try again.`
    );
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}
