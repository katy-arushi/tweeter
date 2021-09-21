$(document).ready(() => {
  console.log("loaded")
  $('#tweet-text').keypress(() => {
    console.log(this)
  });
});

