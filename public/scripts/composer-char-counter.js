$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function(e) {
    var $tweet = $(this);
    var $counter = $tweet.siblings('.tweetContent').find('#counter');
    const allowedTweetLength = 140;

    var remainingChars = allowedTweetLength - $tweet.val().length;
    $counter.val(remainingChars);
    
    if (remainingChars < 0) {
      $counter[0].classList.remove('counter');
      $counter[0].classList.add('counterRed');
    } else {
      $counter[0].classList.remove('counterRed');
      $counter[0].classList.add('counter');
    }

  });



});