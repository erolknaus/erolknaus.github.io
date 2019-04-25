let statemap = L.map('map3').setView([32.18, -99.14], 4)
let basemapUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png'
L.tileLayer(basemapUrl).addTo(myMap)
let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(stateDemographicsUrl, function (data) {
  let stateStyle = function (feature) {
    let size = feature.properties.SQMI // get the current state's Size attribute
    let stateColor = 'olive' // let the initial color be a darker green
    if ( size < 581369.17 ) { stateColor = 'green' } // if the state's size is less than the national average, color it a lighter green
    return {
      color: stateColor, //use the color variable above for the value
      weight: 1,
      fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
     let name = feature.properties.STATE_NAME
     let size = feature.properties.SQMI
     layer.bindPopup('Average size of ' + name + ': ' + size + '<br>National average: ')
   }
  let geojsonOptions = {
    style: stateStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, ).addTo(stateMap)
})
