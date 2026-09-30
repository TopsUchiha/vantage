export async function geocode(place: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VantageLogistics/1.0 (admin geocoding)' },
      signal: AbortSignal.timeout(4000),
    })
    const [hit] = await res.json()
    return hit ? { lat: parseFloat(hit.lat), lng: parseFloat(hit.lon) } : null
  } catch {
    return null
  }
}
