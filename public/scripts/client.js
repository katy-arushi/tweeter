/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = function(tweets) {

  };
  
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="all-tweets-border">
        <header class="tweet-header">
          <div class="tweet-avatar"> 
            <img src=${tweet.user.avatars} class="avatar-image">
            <div class="user-name"><b>${tweet.user.name}</b></div>
          </div>
          <b>${tweet.user.handle}</b>
        </header>
      <p class="tweet-body">${tweet.content.text}</p>
      <footer class="all-tweets-footer">
        <div class="time-ago">${timeago.format(tweet.created_at)}</div>
        <div class="tweet-icons">
        <i id="icon1" class="fas fa-flag"></i>
        <i id="icon2" class="fas fa-retweet"></i>
        <i id="icon3" class="fas fa-heart"></i>
      </footer>
    </article>
    `;

    return $tweet;
  };


// Test / driver code (temporary). Eventually will get this from the server.
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
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
