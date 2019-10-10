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
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet))
    }
  }

  $("#toggle").click(function() {
    $("#newTweet").slideToggle( "slow" );
  });

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
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
        <span class="flags">LIKE ME!!!</span>
      </footer>
    </article>`
    );
  
    return $tweet;
  }

  const loadTweets = function() {
    $.ajax('/tweets', {method: "GET"})
    .then((res) => {
      renderTweets(res);
    })
  };

  loadTweets();

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