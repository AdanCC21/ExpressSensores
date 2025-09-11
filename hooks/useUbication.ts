export async function useUbication(location: any) {
    console.log(location);
    let distance = getDistanceFromLatLonInM(location.latitude, location.longitude, 37.4220936, -116.571108);
    return distance <= 50 ? true : false
}

function getDistanceFromLatLonInM(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371e3; // Radio de la tierra en metros
    const toRad = (deg: any) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distancia en metros
}
