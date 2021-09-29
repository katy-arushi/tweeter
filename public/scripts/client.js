$(document).ready(() => {
  // prevent cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to render all tweets from an array of tweet objects
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetRendered = createTweetElement(tweet); // renders the tweet object into HTML
      $('#tweets-container').prepend(tweetRendered);
    }
  };

  // function to create HTML element from a tweet object of objects
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
      <p class="tweet-body">${escape(tweet.content.text)}</p>
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

  // function that checks if data in form submitted is neither empty nor over 140 chars (tweet char limit), if valid data, posts new tweet and loads tweets async
  const postTweet = function(event) {
    event.preventDefault(); // prevent the default behaviour of the submit button, which is refreshing the page
    const formData = $('#new-tweet-placeholder').val();
    const maxChars = 140;
    const formBorder = $('#new-tweet-form')

    if (formData.length === 0) {
      $('div.alert').html('<p><i id="icon-alert" class="fas fa-exclamation-triangle"></i>Error: tweet cannot be empty!<i id="icon-alert" class="fas fa-exclamation-triangle"></i></p>');
      $('div.alert').addClass('alert-styles');
      
      formBorder.css("border-color", "#c22121");
      formBorder.css("border-width", "4px");
      
    } else if (formData.length > maxChars) {
      $('div.alert').html('<p><i id="icon-alert" class="fas fa-exclamation-triangle"></i>Error: tweet cannot be more than 140 characters!<i id="icon-alert" class="fas fa-exclamation-triangle"></i></p>')
      $('div.alert').addClass('alert-styles');

      formBorder.css("border-color", "#c22121");
      formBorder.css("border-width", "4px");

    } else {
      const serializedData = $(this).serialize();
      $.post('/tweets', serializedData) // since no error was found and alerted, can post
        .then(() => {
          $('#tweets-container').empty();
          $('#new-tweet-placeholder').val('');
          $('.counter').first().val(140);
          loadTweets();
        });
    };
  };

  const form = $('#new-tweet-form'); // find the element that has this ID
  form.on('submit', postTweet); // when the form is submitted, run this function, that takes in the event

  const loadTweets = function() {
    $.get('/tweets')
      .then(result => renderTweets(result))
      .catch(error => console.log('Error:', error));
  };

  loadTweets();
});
