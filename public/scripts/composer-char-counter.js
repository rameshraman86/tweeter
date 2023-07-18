$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function(e) {
    var $tweet = $(this);
    var $counter = $tweet.siblings('.tweetContent').find('.counter');
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


  var $flagIcon = $(".flag-icon i");
  var $retweetIcon = $(".retweet-icon i");
  var $heartIcon = $(".heart-icon i");

  $($flagIcon).on('mouseover', function(e) {
    $flagIcon[0].setAttribute("class", "fa-solid fa-flag");
  });
  $($flagIcon).on('mouseout', function(e) {
    $flagIcon[0].setAttribute("class", "fa-regular fa-flag");
  });

  // $($retweetIcon).on('mouseover', function(e) {
  //   $retweetIcon[0].setAttribute("class", "fa-solid fa-retweet");
  // });
  // $($retweetIcon).on('mouseout', function(e) {
  //   $retweetIcon[0].setAttribute("class", "fa-thin fa-retweet");
  // });


  $($heartIcon).on('mouseover', function(e) {
    $heartIcon[0].setAttribute("class", "fa-solid fa-heart");
  });
  $($heartIcon).on('mouseout', function(e) {
    $heartIcon[0].setAttribute("class", "fa-regular fa-heart");
  });


});