
  $('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  });
  $("#artist-submit").on("click", function (event){ 
    console.log($("#artist-input").val());})
  $("#genre-submit").on("click", function (event){ 
    console.log($("#genre-input").val());})

// function btnToggle() { 
//     document.getElementById("dropdown-trigger").classList.toggle("show"); 
// } 
  
// Prevents menu from closing when clicked inside 
$("dropdownArtist").addEventListener('click', function (event) { 
    alert("click outside"); 
    event.stopPropagation(); 
}); 
  
// // Closes the menu in the event of outside click 
// window.onclick = function(event) { 
//     if (!event.target.matches('.dropdown-content')) { 
      
//         var dropdowns =  
//         document.getElementsByClassName("dropdown-content"); 
          
//         var i; 
//         for (i = 0; i < dropdowns.length; i++) { 
//             var openDropdown = dropdowns[i]; 
//             if (openDropdown.classList.contains('show')) { 
//                 openDropdown.classList.remove('show'); 
//             } 
//         } 
//     } 
// } 