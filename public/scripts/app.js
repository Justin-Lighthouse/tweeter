/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  $($tweet).html(
  `<article class="tweet">
    <header>
      <img class="avatars" src=${tweet.user.avatars}>
      <span class="name">${tweet.user.name}</span>
      <span class="name handle">${tweet.user.handle}</span>
    </header>
    <p class="content">${tweet.content.text}</p>
    <footer class="tweet-footer">
      <span class="created_at" >${tweet.created_at}</span>
      <span class="flags">LIKE ME!!!</span>
    </footer>
  </article>`
  );

  return $tweet;
}

const $tweet = createTweetElement(tweetData);
console.log(typeof $tweet)
// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet);

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const renderTweets = function(tweets) {
// // loops through tweets
// // calls createTweetElement for each tweet
// // takes return value and appends it to the tweets container
// }

// renderTweets(data);