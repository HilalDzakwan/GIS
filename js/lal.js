import { get } from "https://jscroot.github.io/api/croot.js";
import {responseData} from "./controller/controller.js"
import {URLGeoJson} from "./template/template.js"
import {map} from './config/petaconfig.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable").getElementsByTagName('tbody')[0];

    fetch("waypoint.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable2").getElementsByTagName('tbody')[0];

    fetch("polygon.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.tempat;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable3").getElementsByTagName('tbody')[0];

    fetch("polyline.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.jalan;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import { Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

// Definisikan URL GeoJSON untuk masing-masing jenis fitur
const polygonGeoJSONUrl = 'https://raw.githubusercontent.com/HilalDzakwan/GIS/main/polygon.json';
const lineStringGeoJSONUrl = 'https://raw.githubusercontent.com/HilalDzakwan/GIS/main/polyline.json';
const pointGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/waypoint.json';

// Buat sumber vektor dan lapisan vektor untuk masing-masing jenis fitur
const polygonSource = new VectorSource({
  format: new GeoJSON(),
  url: polygonGeoJSONUrl,
});

const lineStringSource = new VectorSource({
  format: new GeoJSON(),
  url: lineStringGeoJSONUrl,
});

const pointSource = new VectorSource({
  format: new GeoJSON(),
  url: pointGeoJSONUrl,
});

const polygonLayer = new VectorLayer({
  source: polygonSource,

});

const lineStringLayer = new VectorLayer({
  source: lineStringSource,

});

const pointLayer = new VectorLayer({
  source: pointSource,

});


map.addLayer(polygonLayer);
map.addLayer(lineStringLayer);
map.addLayer(pointLayer);

onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
get(URLGeoJson,responseData);