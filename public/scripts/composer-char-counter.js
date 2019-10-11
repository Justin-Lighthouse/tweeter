$(document).ready(function() {
  const maxTweetLength = 140;
  $("#myTextbox").keyup(function() {
    const counter = $(this).val().length;
    if (maxTweetLength - counter < 0) {
      $(".counter").addClass("tooBig")
    }
    $($(this).siblings("span")[0]).text(maxTweetLength - counter);
  });
});