// Disable ESLint
/* eslint-disable no-undef */
$(document).ready(() => {
  $("textarea.new-tweet-input").on('input', function() {
    let text = $('textarea').val();
    remainingLetterCounter = 140 - text.length;
    $("span.counter").text(`${remainingLetterCounter}`);
    if (remainingLetterCounter >= 0) {
      $("span.counter").css('color', '');
    } else {
      $("span.counter").css('color', 'red');
    }
    
  });
});