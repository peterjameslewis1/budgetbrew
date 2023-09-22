export default function getGeoLocation(){
    if (navigator.geolocation) {
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          navigator.geolocation.getCurrentPosition((pos) => {
            if ('coordinates' in pos) return { coordinates: pos.coordinates }
          }, (error) => {
            return { coordinates: null }
          }, { enableHighAccuracy: true, timeout: 5000 });
            console.log(result);
        });
    }       
    return { message: 'Geolocation is not supported by this browser.', coordinates: [] }
}