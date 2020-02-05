import { stringify } from "querystring";

$(document).ready(function () {
  $("currentlyTracking").hide();

  // THE VARIABLE BELOW IS THE INTEGER ID# of USER'S CHOSEN GENRE
  var userSelectedGenre;
  var genreID;

  $(".js-example-data-ajax").select2({
    ajax: {
      url: "api/genre",
      dataType: 'json',
      delay: 250,
      AccessControlAllowOrigin: 'http://localhost:8080',
      // data: function (params) {
      //   return {
      //     q: params.term, // search term
      //   };
      // },
      processResults: function (data, params) {
 
        var id;

        $(".select2-search__field").keydown(function autoFill() {

          $("#mapInfoDiv").empty();

        console.log(data)
          // console.log(data.results)
         var inputText = $("input").val();
         console.log(inputText);
          // var loopStop = 0;
          for (id = 0; id < data.length; id++) {
            console.log(inputText);

//PICK UP HERE!!!!!
            if (datatext.indexOf(inputText, 0) !== -1) {
              $("#mapInfoDiv").append(`<a class="chosenGenre" id=${id} data-name="${data[id].name}"> <option>${data[id].name}</option></a>`);
            } 
              
            
            // $("#mapInfoDiv").append(`<a class="chosenGenre" id=${id} data-name="${data[id].name}"> <option>${data[id].name}</option></a>`);
          };
        });
       
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(params.page);
        

        return {
          results: data,
          pagination: {
            more: (params.page * 30) < data.total_count,
              }
            };
          },
          cache: true

          },
          placeholder: 'Search Genres',

          minimumInputLength: 1,
          templateResult: formatResults,
          templateSelection: formatResultsSelection,

        });

     
  // This are left over from documentation /setup... 
  // These functions are currently blocking the dropdown menu for selections, and
  // this is probably preferable. 
  function formatResults(repo) {
    if (repo.loading) {
      // return repo.text;
    }

  }

  function formatResultsSelection(repo) {
    if (repo.loading) {
      // return repo.text;
    }
    // return repo.full_name || repo.text;
  }

});
$.fn.select2.defaults.set('amdBase', 'select2/');
$.fn.select2.defaults.set('amdLanguageBase', 'select2/i18n/');

$(document).on("click", ".chosenGenre", function userGenreChoice(userSelectedGenre, genreID) {
  $("#currentlyTracking").show();
  $("#trackingGenre").html("currently mapping: " + this.text)
  genreID = this.id;
  userSelectedGenre = this.text;
  console.log(genreID);
  console.log(userSelectedGenre);
  $.get('/api/genre/' + this.text.trim()).then(data => {
    console.log(data);

    try {
      map.removeSource('earthquakes')
    } catch(e){
      console.log(e)
    }
 
    map.addSource('earthquakes', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: data,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    // THIS IS THE MAP FUNCTION TO WORK ON!!!
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
          '#E52797',
          10,
          '#C4FA70',
          75,
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
        'text-size': 12
      }
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });
  })

 


});
