export default function getGeoLocation() {
  const cor = navigator.geolocation.watchPosition((res) => ({ lat: res.coords.latitude, lng: res.coords.longitude }), (error) => ({ error }))
  console.log('cor', cor)
  // if (navigator.geolocation) {
  //   navigator.permissions
  //     .query({ name: "geolocation" })
  //     .then(function (result) {
  //       console.log('result', result)
  //       if (result.state === "granted") {
  //         navigator.geolocation.getCurrentPosition((pos) => {
  //           if ('coords' in pos) return { lat: pos.coords.latitude, lng: pos.coords.longitude }
  //         })
  //       }
  //       if (result.state === "prompt") {
  //         navigator.geolocation.getCurrentPosition((pos) => {
  //           if ('coords' in pos) return { lat: pos.coords.latitude, lng: pos.coords.longitude }
  //         })
  //       }
  //     }), (error) => {
  //       console.log('error')
  //       return { coordinates: null }
  //     }, { enableHighAccuracy: true, timeout: 5000 };
  // };
  return { message: 'Geolocation is not supported by this browser.', coordinates: [] }
}