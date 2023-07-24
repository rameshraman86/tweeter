$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function(e) {
    let $tweet = $(this);
    let $counter = $("#counter");

    const allowedTweetLength = 140;
    let remainingChars = allowedTweetLength - $tweet.val().length;
    
    if (remainingChars < 0) {
      $counter.removeClass("counter").addClass("counterRed");
    } else {
      $counter.removeClass("counterRed").addClass("counter");
    }
    $counter.val(remainingChars);
  });
});