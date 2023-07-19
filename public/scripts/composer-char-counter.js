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

  var $flagIcon = $(".flag-icon i");
  var $heartIcon = $(".heart-icon i");

  $($flagIcon).on('mouseover', function(e) {
    $flagIcon[0].setAttribute("class", "fa-solid fa-flag");
  });
  $($flagIcon).on('mouseout', function(e) {
    $flagIcon[0].setAttribute("class", "fa-regular fa-flag");
  });


  $($heartIcon).on('mouseover', function(e) {
    $heartIcon[0].setAttribute("class", "fa-solid fa-heart");
  });
  $($heartIcon).on('mouseout', function(e) {
    $heartIcon[0].setAttribute("class", "fa-regular fa-heart");
  });


});