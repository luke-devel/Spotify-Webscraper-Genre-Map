
   mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2ZyZWlsbHkiLCJhIjoiY2s1dW9mYmR1MWJ0cjNtb25lY240N3oxYyJ9.oUoPX11hY_Rz6ausgTENyw';
   var map = new mapboxgl.Map({
   container: 'map',
   center:[70,-10],
   zoom: 1,
   
   style: 'mapbox://styles/matthewfreilly/ck6136quy01761iml3gu9dvp3/draft'
   });

   map.on('load', function () {
      // Add a new source from our GeoJSON data and set the
      // 'cluster' option to true. GL-JS will add the point_count property to your source data.
      map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data:
        {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "properties": {  "mag": 1000 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 0.0 ] } },
{ "properties": {  "mag": 1 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 23.1016, 0.0 ] } },
{ "properties": {  "mag": 3 }, "geometry": { "type": "Point", "coordinates": [ -97.5129,33.1016, 20.0 ] } },
{ "properties": {  "mag": 3 }, "geometry": { "type": "Point", "coordinates": [ -97.5129,33.1016, 20.0 ] } },
{ "properties": {  "mag": 5 }, "geometry": { "type": "Point", "coordinates": [ -13.5129, 0.1016, 0.0 ] } },
]
}
,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 28
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 3,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // Mapbox Geocoder
      // map.addControl(
      //   new MapboxGeocoder({
      //   accessToken: mapboxgl.accessToken,
      //   mapboxgl: mapboxgl
      //   })
      //   );

      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        console.log(features);
        
        // Javascript click on point to display data point_count 
        var nodePointCount = document.createElement("li");
        var textnodePointCount = document.createTextNode(features[0].properties.point_count)
        nodePointCount.appendChild(textnodePointCount);
        document.getElementById("mapInfoDiv").appendChild(nodePointCount);

        // Javascript click on point to display city 
     
var longlat = features[0].geometry.coordinates;
       
var queryMapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longlat + ".json?access_token=pk.eyJ1IjoibWF0dGhld2ZyZWlsbHkiLCJhIjoiY2s1dW9mYmR1MWJ0cjNtb25lY240N3oxYyJ9.oUoPX11hY_Rz6ausgTENyw";



// HERE IS WHERE I'LL NEED TO PICK UP!
     console.log(queryMapboxURL);

 

     

    var nodeCoordinates = document.createElement("li");
    var textnodeCoordinates = document.createTextNode(textnodeCoordinates);
        nodeCoordinates.appendChild(textnodeCoordinates);
        document.getElementById("mapInfoDiv").appendChild(nodeCoordinates);
      }) 
    })

        features[0].properties.point_count
        map.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: 5
            });
          }
        );
     

      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
      });


