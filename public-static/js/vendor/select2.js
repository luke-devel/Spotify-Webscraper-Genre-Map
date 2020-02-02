
$(document).ready(function() {
    
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
        console.log(params);
        //this logs from url + /api/genres
        var genreList = [];
        var id;

$(".select2-search__field").keyup(function autoFill() {

    $("#mapInfoDiv").empty();

        for (id=1; id < data.results.length - 1; id++){
         
          // genreList.push(data.results[id].text);
          const indexOfFirst = (data.results[id].text).indexOf(params.term);
        if(((data.results[id].text).match(params.term))){
          $("#mapInfoDiv").append(`<option>${data.results[id].text}</option>`);
        }
          // $("#mapInfoDiv").append(`<option>${data.results[id].text}</option>`);
    
        }
        if (
            console.log(data.results[id].text.split('=')[1])); 
          $(".js-example-matcher").select2({
            matcher: autoFill
          });           
    });

        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;
  
        return {
          results: data.results,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    placeholder: 'Search for a Genre',
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
  
  });
  // This are left over from documentation /setup... 
  // They are currently blocking the dropdown menu for selections, and
  // this is fine because I haven't configured that yet. I do like the
  // autopost to sidediv, so the exact presentation of these query
  // autofills is yet to be determined...
  function formatRepo (repo) {
    if (repo.loading) {
      return repo.text;
    }
  
  }
  
  function formatRepoSelection (repo) {
    return repo.full_name || repo.text;
  }

});
$.fn.select2.defaults.set('amdBase', 'select2/');
$.fn.select2.defaults.set('amdLanguageBase', 'select2/i18n/');

