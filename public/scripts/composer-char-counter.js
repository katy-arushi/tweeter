$(document).ready(() => {
  $('#new-tweet-placeholder').on('input', function(event) {
    const maxChars = 140;
    $('div.alert').empty().removeClass('alert-styles')
    const textArea = event.target;
    const count = $(textArea).val().length;
    const charsLeft = (maxChars - count);
    const formBorder = $('#new-tweet-form')
    const counter = $(textArea).next().find('output'); // classes are re-used, could have a side effect
    counter.text(charsLeft);
    if (charsLeft < 0) { // for making the counter red
      counter.addClass("warningText"); // better practice to add a class rather than in line css style
      formBorder.css("border-color", "#c22121"); // make the border of the form red
      formBorder.css("border-width", "4px"); // put form border to thicker width for error
    } else {
      counter.removeClass("warningText");
      formBorder.css("border-color", "white"); // put the border of the form back to white
      formBorder.css("border-width", "2px"); // put form border back to default / normal width
    }
  });
});