

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2ZyZWlsbHkiLCJhIjoiY2s1dW9mYmR1MWJ0cjNtb25lY240N3oxYyJ9.oUoPX11hY_Rz6ausgTENyw';
var map = new mapboxgl.Map({
  container: 'map',
  center: [70, -10],
  zoom: 1,

  style: 'mapbox://styles/matthewfreilly/ck68c8h6h08s61jpk4gnavuw6'
});

  // var months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December'
  // ];

  // function filterBy(month) {
  //   console.log("filtering by month" + month);

  //   var filters = ['==', 'month', month];
  //   // map.setFilter('unclustered-point', filters);
  //   map.setFilter('cluster-count', filters);
  //   map.setFilter('clusters', filters);

  //   // Set the label to the month

  //   document.getElementById('month').style.color = "#030303";
  //   // document.getElementById('month').style.paddingLeft = ".5rem";

  //   document.getElementById('month').style.fontSize = "1.2rem";
  //   document.getElementById('month').style.fontFamily = "font-family: 'Cabin', sans-serif;";
  //   document.getElementById('month').textContent = months[month];
  // }

map.on('load', function () {
  // Add a new source from our GeoJSON data and set the
  // 'cluster' option to true. GL-JS will add the point_count property to your source data.
  ////////////////
  // selectlink;


  // data.features = data.features.map(function (d) {
  //   d.properties.month = new Date(d.properties.time).getMonth();
  //   return d;
  // });

  // console.log(data);

  //////////////////
  
  // map.addLayer({
  //   id: 'unclustered-point',
  //   type: 'circle',
  //   source: 'earthquakes',
  //   //filter: ['!', ['has', 'point_count']],
  //   paint: {
      
  //     // 'circle-color': '#11b4da',
  //     // // 'circle-radius': 4,
  //     // 'circle-stroke-width': 1,
  //     // 'circle-stroke-color': '#fff'
  //   }
  // });


  // document.getElementById('slider')
  //   .addEventListener('input', function (e) {
  //     var month = parseInt(e.target.value, 10);
  //     console.log(month);
  //     filterBy(month);


      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
      });
      //  inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
       
     
      var clusterId = features[0].properties.cluster_id;
      map.getSource('earthquakes').getClusterExpansionZoom(
        clusterId,
        function (err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
        }
      );
    });



// inspect a cluster on click
map.on('click', 'clusters', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['clusters']
  });
  var clusterId = features[0].properties.cluster_id;
  console.log(features);

  var longlat = features[0].geometry.coordinates;

  // var queryMapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longlat + ".json?access_token=pk.eyJ1IjoibWF0dGhld2ZyZWlsbHkiLCJhIjoiY2s1dW9mYmR1MWJ0cjNtb25lY240N3oxYyJ9.oUoPX11hY_Rz6ausgTENyw";

  // Creating City and Cluster # jquery append here
  var nodeCoordinates = document.createElement("li");
  var textnodeCoordinates = document.createTextNode(longlat);
  nodeCoordinates.appendChild(textnodeCoordinates);
  document.getElementById("clickedCluster").appendChild(nodeCoordinates);

  var nodePointCount = document.createElement("li");
  var textnodePointCount = document.createTextNode(features[0].properties.point_count)
  nodePointCount.appendChild(textnodePointCount);
  document.getElementById("clickedCluster").appendChild(nodePointCount);

  // Javascript click on point to display city 

});

// async function addSource() {
//   const waiting = await addDataSource();
//   map.addSource('some id', {
//     type: 'geojson',
//     data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'

//   });
// }


