
// In your Javascript (external .js resource or <script> tag)
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
        for (id=1; id < data.results.length - 1; id++){
          genreList.push(data.results[id].text);
          
          $("#mapInfoDiv").append(`<option>${data.results[id].text}</option>`);
          
        }
        
        //This logs the whole genreList
        console.log(genreList);
        var letterPoint = $(params).val().length;
        



    
        
           











        
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
  
  function formatRepo (repo) {
    if (repo.loading) {
      return repo.text;
    }
  
    // var $container = $(
    //   "<div class='select2-result-repository clearfix'>" +
    //     "<div class='select2-result-repository__meta'>" +
    //       "<div class='select2-result-repository__title'></div>" +
    //       "<div class='select2-result-repository__description'></div>" +
    //       "<div class='select2-result-repository__statistics'>" +
    //         "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div>" +
    //         "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div>" +
    //         "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div>" +
    //       "</div>" +
    //     "</div>" +
    //   "</div>"
    // );
    console.log(repo);
  
    $container.find(".select2-result-repository__title").text(data.results[id].text);
    $container.find(".select2-result-repository__description").text(repo.description);
    $container.find(".select2-result-repository__forks").append(repo.forks_count + " Forks");
    $container.find(".select2-result-repository__stargazers").append(repo.stargazers_count + " Stars");
    $container.find(".select2-result-repository__watchers").append(repo.watchers_count + " Watchers");
  
    return $container;
  }
  
  function formatRepoSelection (repo) {
    return repo.full_name || repo.text;
  }

});
$.fn.select2.defaults.set('amdBase', 'select2/');
$.fn.select2.defaults.set('amdLanguageBase', 'select2/i18n/');

