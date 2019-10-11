/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $("#tweets-container").empty();  
  for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet))
    }
  }

  //slide toggles the compose tweet form
  $("#toggle").click(function() {
    $("#newTweet").slideToggle( "slow" );
    document.getElementById("myTextbox").focus();
  });

  //keeps text safe, removes chance of users creating tweets that execute scripts
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  //takes the input given and puts it into html format so it can be seen in a tweet format
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
  
    $($tweet).html(
    `<article>
      <header class="accountInfo">
        <img class="avatars" src=${tweet.user.avatars}>
        <span class="name">${tweet.user.name}</span>
        <span class="name handle">${tweet.user.handle}</span>
      </header>
      <p class="content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <span class="created_at" >${tweet.created_at}</span>
        <div class="flags">
          <span class="fas fa-flag"></i>
          <span class="fas fa-retweet"></i>
          <span class="fas fa-thumbs-up"></i>
        </div>
      </footer>
    </article>`
    );
  
    return $tweet;
  }

  //renders the tweets list without having to refresh the page
  const loadTweets = function() {
    $.ajax('/tweets', {method: "GET"})
    .then((res) => {
      renderTweets(res);
    })
  };

  loadTweets();

  //on submit from the form send the text to /tweets, also checks for no message and a message that's too long.
  //after submission, it then reloads all tweets so the user doesn't need to refresh the page.
  $('#newTweet').submit(function(event) {
    event.preventDefault();
    if($($('#myTextbox')).val().length === 0) {
      $(".alert").text("Oops, your tweet is empty!")
      $(".alert").slideToggle( "slow" );
    } else if($($('#myTextbox')).val().length > 140) {
      $(".alert").text("Oops, your tweet exceeds the max character length!")
      $(".alert").slideToggle( "slow" );
    } else {
      const data = $($('#myTextbox')).serialize();
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: data
      })
      .then((res) => {
        $('textarea').val('');
        $('.counter').text(140);
        loadTweets();
      })
    }
  })

});