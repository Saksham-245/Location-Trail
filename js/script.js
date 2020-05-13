//creating map object
const mymap = L.map('map-container').setView([28.7041, 77.1025], 3);
//adding layers to the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2hhbmF5YTE3MTk5IiwiYSI6ImNrYTU4a2pnaDAxODAzaG1xbXY5dnAxdDQifQ.EHjZfDMvc_JvLr6h2VPVUA'
}).addTo(mymap);
// start and stop button
const startButton = document.getElementById('button').addEventListener('click', startTrailing);
const stopButton =document.getElementById('stop').addEventListener('click', stopTrailing);
let id;
function startTrailing() {
    if (navigator.geolocation) {
        id = navigator.geolocation.watchPosition(success,error,options);
    } else {
        alert('Geolocation is not supported in this browser.');
    }
}
function success(position){
  //coordinates of our Current location
  const coordinates=[position.coords.latitude,position.coords.longitude];
  //zooming to the current Location
  mymap.setView(coordinates,14);
  //adding marker to the current position on Map
  const marker=L.marker(coordinates).addTo(mymap);
  //binding popup and immediately opening the attatched popup
  marker.bindPopup(`<b>Current Location: <b> ${coordinates}`).openPopup();
  //creating a trail element
  const trailElement =document.createElement('div');
  trailElement.className = 'alert alert-info';
  trailElement.innerHTML = `<b>Latitude:</b> ${position.coords.latitude} <b>Longitude:</b> ${position.coords.longitude}<br> <b>Date/Time:</b> ${Date()}`;
  //adding element dynamically on page
  document.querySelector('.container-footer').insertBefore(trailElement, document.querySelector('.alert'));
}
function error(err){
  const errorMessage = document.createElement('div');
  errorMessage.className = 'alert alert-danger mt-3';
  errorMessage.innerHTML = `ERROR: ${err.message}. Please refresh and start again.`;
  document.querySelector('.container-body').append(document.querySelector('.map-container'),errorMessage)
}
options={
  enableHighAccuracy: true,
  maximumAge: 5000
}
function stopTrailing(){
  navigator.geolocation.clearWatch(id);
  const trailStop =document.createElement('div');
  trailStop.className ="alert alert-success";
  trailStop.innerHTML = `<b>Trail generation is stopped.</b>`;
  document.querySelector('.container-footer').insertBefore(trailStop, document.querySelector('.alert'));
}
