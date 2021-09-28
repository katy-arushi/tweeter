$(document).ready(() => {
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
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

  const form = $('#new-tweet-form'); // find the element that has this ID
  form.on('submit', function(event) { // when the form is submitted, run this function, that takes in the event
    event.preventDefault(); // prevent the default behaviour of the submit button, which is refreshing the page
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post('/tweets', serializedData)
  });

  const loadTweets = function() {
    $.ajax({ url: '/tweets', method: 'GET' })
    .then(result => renderTweets(result))
    .catch(error => console.log(`Error:`, error));
  };

  loadTweets();
});