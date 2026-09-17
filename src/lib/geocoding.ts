const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Resolves free text (a full UK postcode, or a town/place name) to coordinates.
 * Postcodes go through postcodes.io (free, no key). Town names currently fall
 * through to null — wire in your chosen geocoder (Google Geocoding, Photon,
 * or your Local Business Data API's own geocoding endpoint) here.
 */
export async function resolveLocation(query: string): Promise<Coordinates | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  if (UK_POSTCODE_REGEX.test(trimmed)) {
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      if (json.result) {
        return { latitude: json.result.latitude, longitude: json.result.longitude };
      }
    } catch {
      return null;
    }
  }

  // TODO: town/place name -> your chosen geocoder.
  return null;
}

/**
 * Autocomplete stub for the location search box. Replace the mock list with
 * a real call (postcodes.io has a free `/postcodes?q=` partial-match endpoint
 * for postcodes; pair it with a places/geocoding API for town names).
 */
export async function fetchLocationSuggestions(query: string): Promise<string[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  if (UK_POSTCODE_REGEX.test(trimmed) || /^[A-Z]{1,2}\d/i.test(trimmed)) {
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      if (Array.isArray(json.result)) {
        return json.result.map((r: { postcode: string }) => r.postcode);
      }
    } catch {
      return [];
    }
  }

  // Placeholder town-name suggestions until a real places API is wired in.
  const MOCK_TOWNS = ["London", "Manchester", "Bristol", "Leeds", "Brighton", "Liverpool"];
  return MOCK_TOWNS.filter((t) => t.toLowerCase().startsWith(trimmed.toLowerCase()));
}

export function haversineKm(
    a: { latitude: number; longitude: number },
    b: { latitude: number; longitude: number }
): number {
    const R = 6371;
    const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
    const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
    const lat1 = (a.latitude * Math.PI) / 180;
    const lat2 = (b.latitude * Math.PI) / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}