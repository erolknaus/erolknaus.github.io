let floridamap = L.map('finalproject').setView([32.18, -99.14], 4)
let basemapUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png'
L.tileLayer(basemapUrl).addTo(floridamap)
let floridaDemographicsUrl = 'https://opendata.arcgis.com/datasets/003e10bdf5054162b27c65db3ebc3d07_0.geojson'
jQuery.getJSON(floridaDemographicsUrl, function (data) {
  let zipStyle = function (feature) {
   let TotalPopul = feature.properties.TotalPopul // get the current zip's Population attribute
   let zipColor = 'Red' // let the initial color be red
   if ( TotalPopul < 20000 ) { stateColor = 'green' } // if the zip's population is less than the state average, color it green
   return {
     color: stateColor, //use the color variable above for the value
     weight: 1,
     fillOpacity: 0.2
    }
  })
  let onEachFeature = function (feature, layer) {
     let name = feature.properties.FDI
     let population = feature.properties.TotalPopul
     layer.bindPopup('Average population of ' + name + ': ' + population + '<br>State average: 20000')
   }
  let geojsonOptions = {
    style: zipStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, ).addTo(floridamap)
})
