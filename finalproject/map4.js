let floridamap = L.map('finalproject').setView([32.18, -99.14], 4)
L.tilelayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png').addTo(floridamap)
let floridaDemographicsUrl = 'https://opendata.arcgis.com/datasets/003e10bdf5054162b27c65db3ebc3d07_0.geojson'
jQuery.getJSON(floridaDemographicsUrl, function (data) {
  let zipStyle = function (feature) {
   let TotalPopul = feature.properties.TotalPopul // get the current zip's Population attribute
   let zipColor = 'Red' // let the initial color be red
   if ( TotalPopul < 20000 ) { stateColor = 'green' } // if the zip code's population is less than 20,000, color it green
   return {
     color: zipColor, //use the color variable above for the value
     weight: 1,
     fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
     let name = feature.properties.FDI
     let population = feature.properties.TotalPopul
     layer.bindPopup('TotalPopul' + 'FDI' + 'PcA_20_24')
   }
  let CollegeTowns=L.polygon([
    [29.731288, -82.412799],
    [29.737922, -82.266309],
    [29.570606, -82.392070]
  ]).addTo(floridamap)
  let geojsonOptions = {
    style: zipStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, geojsonOptions).addTo(floridamap)
})
