let floridamap = L.map('finalproject').setView([28.342828, -83.912725], 6)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png').addTo(floridamap)
let floridaDemographicsUrl = 'https://opendata.arcgis.com/datasets/003e10bdf5054162b27c65db3ebc3d07_0.geojson'
//jQuery.getJSON(floridaDemographicsUrl, function (data){
//let floridamap= L.map('finalproject').setView([30.4515, -91.1871], 4)
//L.tilelayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png').addTo(floridamap)
jQuery.getJSON(floridaDemographicsUrl, function (data) {
  let zipStyle = function (feature) {
   let TotalPopul = feature.properties.TotalPopul // get the current zip's Population attribute
   let zipColor = 'Red' // let the initial color be red
   if (TotalPopul < 20000) {zipColor = 'green'} // if the zip code's population is less than 20000, color it green
   return {
     color: zipColor, //use the color variable above for the value
     weight: 1,
     fillOpacity: 0.2
    }
  }
  let onEachFeature = function (feature, layer) {
     let name = feature.properties.FDI
     let population = feature.properties.TotalPopul
     layer.bindPopup('TotalPopul'+'FDI'+'PcA_20_24')
   }
  let CollegeTown1=L.polygon([
    [29.731288, -82.412799],
    [29.737922, -82.266309],
    [29.570606, -82.392070]
  ]).addTo(floridamap)
  let CollegeTown2=L.polygon([
    [30.496041, -84.381630],
    [30.360903, -84.380558],
    [30.478398, -84.222869]
  ]).addTo(floridamap)
  let HomesforSale=L.polygon([
    [26.601911, -82.127762],
    [26.669833, -81.620704],
    [26.093442, -81.736284]
  ]).addTo(floridamap)
  let geojsonOptions = {
    style: zipStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, geojsonOptions).addTo(floridamap)
})
