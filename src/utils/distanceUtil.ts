/**
 * Wild stuff, calculates distance between two points on earth using their latitudes and longitudes.
 * https://www.movable-type.co.uk/scripts/latlong.html
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns Distance between the two points in kilometers
 **/
export const Distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const r = 6371000; // Radius of the earth in meters
  const phi1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return r * c; // Distance in meters
};
