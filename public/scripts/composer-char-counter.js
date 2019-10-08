$(document).ready(function() {
  let counter = 0;
  $("#myTextbox").keyup(function(e) {
    counter = $(this).val().length;
    $(this).siblings("span")[0] = 140 - counter;
    console.log($(this).siblings("span")[0] = 140 - counter);
    console.log(counter);
  });
});