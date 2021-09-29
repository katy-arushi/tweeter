$(document).ready(() => {
  $('#new-tweet-placeholder').on('input', function(event) {
    const maxChars = 140;
    $('div.alert').empty()
    let textArea = event.target;
    let count = $(textArea).val().length;
    let charsLeft = (maxChars - count);
    let formBorder = $('#new-tweet-form')
    let counter = $(textArea).next().find('output'); // classes are re-used, could have a side effect
    counter.text(charsLeft);
    if (charsLeft < 0) { // for making the counter red
      counter.addClass("warningText"); // better practice to add a class rather than in line css style
      formBorder.css("border-color", "#c22121");
      formBorder.css("border-width", "4px");
    } else {
      counter.removeClass("warningText");
      formBorder.css("border-color", "white");
      formBorder.css("border-width", "2px");
    }
  });
});

// find() goes inward, children
// closest() goes upward the tree