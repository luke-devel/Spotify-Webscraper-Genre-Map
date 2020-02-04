
$(document).ready(function() {
  $("currentlyTracking").hide(); 
  // THE VARIABLE BELOW IS THE INTEGER ID# of USER'S CHOSEN GENRE
  var userSelectedGenre;
  var genreID; 
  
  $(".js-example-data-ajax").select2({
    ajax: {
      url: "api/genres",
      dataType: 'json',
      delay: 250,
      AccessControlAllowOrigin: 'http://localhost:8080',
      data: function (params) {
        return {
          q: params.term, // search term
        }; 
        
      },
      processResults: function (data, params) {
        //this logs params in console
        // console.log(params);
        //this logs from url + /api/genres
        // var genreList = [];
        var id;

    $(".select2-search__field").keydown(function autoFill() {

      $("#mapInfoDiv").empty();
      var loopStop = 0;
        for (id=0; id < data.results.length; id++){
         
          // genreList.push(data.results[id].text);
          // const indexOfFirst = (data.results[id].text).indexOf(params.term);
 
          if((params.term.length >= 3) && ((data.results[id].text).match(params.term))){
          $("#mapInfoDiv").append(`<a class="chosenGenre" id=${id}> <option>${data.results[id].text}</option></a>`);
          $(".chosenGenre").on("click", function(userSelectedGenre, genreID){
           if (loopStop === 0){
          genreID = this.id;
          console.log(genreID);
          console.log(this.text);
          $("#currentlyTracking").show();
          $("#trackingGenre").html("currently tracking: " + this.text)
          userSelectedGenre = this.text;
          loopStop++;
            return userSelectedGenre;
           }    
        });
      };
    };
  });
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
          params.page = params.page || 1;
  
        return {
          results: data.results,
          pagination: {
            more: (params.page * 30) < data.total_count,
          
          }
        };
      },
      cache: true
    
    },
    placeholder: 'Click Spacebar to Search',
    minimumInputLength: 1,
    templateResult: formatResults,
    templateSelection: formatResultsSelection,
   
  });
  
  // This are left over from documentation /setup... 
  // These functions are currently blocking the dropdown menu for selections, and
  // this is probably preferable. 
  function formatResults (repo) {
    if (repo.loading) {
      // return repo.text;
    }
  
  }
  
  function formatResultsSelection (repo) {
    if (repo.loading) {
      // return repo.text;
    }
    // return repo.full_name || repo.text;
  }

});
$.fn.select2.defaults.set('amdBase', 'select2/');
$.fn.select2.defaults.set('amdLanguageBase', 'select2/i18n/');
