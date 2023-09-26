import {createCard} from './create-map-card.js';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';
const ZOOM = '9';

const PIN_URL = '../../img/pin.svg';
const PIN_URL_VERIFIED = '../../img/pin-verified.svg';

const PIN_WIDTH = 36;
const PIN_HEIGHT = 46;

const defaultLocation = {
  lat: 59.92749,
  lng: 30.31127
};

const contractorsListElement = document.querySelector('#contractors-list');
const contractorsMapElement = document.querySelector('#contractors-map');
const contractorsListEmptyMessageElement = document.querySelector('#contractors-list-empty-message');

const map = L.map('map');
const markerGroup = L.layerGroup().addTo(map);

let contractors = [];
let isMapLoaded = false;

const createIcon = (url, width, height) => L.icon({
  iconUrl: url,
  iconSize: [width, height],
  iconAnchor: [width / 2, height],
});

const createMarker = (contractor) => {
  const iconUrl = (contractor.isVerified) ? PIN_URL_VERIFIED : PIN_URL;
  L.marker({
    lat: contractor.coords.lat,
    lng: contractor.coords.lng,
  },{
    icon: createIcon(iconUrl, PIN_WIDTH, PIN_HEIGHT),
  }).bindPopup(createCard(contractor)).addTo(markerGroup);
};

const removeMarkers = () => markerGroup.clearLayers();

const addMarkers = () => {
  removeMarkers();
  if (contractors.length) {
    contractors.forEach((contractor) => createMarker(contractor));
  }
};

const setDefaultMapView = () => {
  map.setView({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  }, ZOOM);
};

const onMapLoad = () => {
  isMapLoaded = true;
};

const renderContractorsMap = (data) => {
  contractorsListElement.style.display = 'none';
  contractorsMapElement.style.display = 'block';
  contractorsListEmptyMessageElement.style.display = 'none';
  contractors = data;

  map.on('load', onMapLoad);
  L.tileLayer(TILE_LAYER_URL, { attribution: TILE_LAYER_ATTRIBUTION }).addTo(map);
  setDefaultMapView();
  if (isMapLoaded) {
    addMarkers();
  }
};

export {renderContractorsMap};
