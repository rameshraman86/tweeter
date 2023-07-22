$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function(e) {
    var $tweet = $(this);
    var $counter = $("#counter");

    const allowedTweetLength = 140;
    var remainingChars = allowedTweetLength - $tweet.val().length;

    if (remainingChars < 0) {
      $counter.removeClass("counter").addClass("counterRed");
    } else {
      $counter.removeClass("counterRed").addClass("counter");
    }
    $counter.val(remainingChars);
  });
});