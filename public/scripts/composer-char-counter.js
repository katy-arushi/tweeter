$(document).ready(() => {
  $('#tweet-text').on('input', function(event) {
    const maxChars = 140;
    let textArea = event.target;
    let count = $(textArea).val().length;
    let charsLeft = (maxChars - count);
    let counter = $(textArea).next().find('output'); // classes are re-used, could have a side effect
    counter.text(charsLeft);
    if (charsLeft < 0) { // for making the counter red
      counter.addClass("warningText"); // better practice to add a class rather than in line css style
    } else {
      counter.removeClass("warningText");
    }
  });
});

// find() goes inward, children
// closest() goes upward the tree