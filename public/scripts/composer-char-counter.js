$(document).ready(function() {
  const maxTweetLength = 140;
  $("#myTextbox").keyup(function() {
    const counter = $(this).val().length;
    $($(this).siblings("span")[0]).text(maxTweetLength - counter);
  });
});