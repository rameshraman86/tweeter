/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// import { format } from 'timeago.js';

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $formattedTweetData = createTweetElement(tweet);
      $('#tweets-container').append($formattedTweetData);
    }
  };


  const createTweetElement = function(tweet) {
    const { content, created_at, user } = tweet;
    const timePassed = timeago.format(created_at);
    const avatar = user.avatars;
    const handle = user.handle;
    const name = user.name;

    const $article = $('<article>').addClass('tweet');

    const $header = $('<header>');
    const $leftSide = $('<div>').addClass('tweet-header-left-side');
    const $avatar = $('<span>').addClass('avatar');
    const $avatarImg = $('<img>').attr('src', sanitize(avatar));
    const $fullName = $('<span>').addClass('user-full-name').text(sanitize(name));

    $avatar.append($avatarImg);
    $leftSide.append($avatar, $fullName);

    const $rightSide = $('<div>').addClass('tweet-header-right-side');
    const $handle = $('<span>').addClass('user-handle').text(sanitize(handle));

    $rightSide.append($handle);

    $header.append($leftSide, $rightSide);

    const $content = $('<p>').text(sanitize(content.text));

    const $hr = $('<hr>');

    const $footer = $('<footer>');
    const $duration = $('<span>').addClass('tweet-duration').text(sanitize(timePassed));

    const $footerRightSide = $('<div>').addClass('tweet-footer-right-side');
    const $flagIcon = $('<span>').addClass('flag-icon').html('<i class="fa-regular fa-flag"></i>');
    const $retweetIcon = $('<span>').addClass('retweet-icon').html('<i class="fa-solid fa-retweet"></i>');
    const $heartIcon = $('<span>').addClass('heart-icon').html('<i class="fa-regular fa-heart"></i>');

    $footerRightSide.append($flagIcon, $retweetIcon, $heartIcon);

    $footer.append($('<div>').append($duration), $footerRightSide);

    $article.append($header, $content, $hr, $footer);

    return $article;
  };

  function sanitize(text) {
    const element = document.createTextNode(text);
    const div = document.createElement('div');
    div.appendChild(element);
    return div.innerHTML;
  }



  const errorMessageElement = function(errorType) {
    const $h3Error = $('<h3>').attr('id', 'error-message');
    if (errorType === "zero") {
      $h3Error.text("Don't be shy. Use your words.");
      return $h3Error;
    }
    if (errorType === "exceededLength") {
      $h3Error.text("Uh oh!!! Tweet length exceeds 140 characters. Buy \"tweeter pro\" to enter more.");
      return $h3Error;
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((res) => {
      renderTweets(res);
    }
    );
  };
  loadTweets();



  const $form = $('form');
  $form.on('submit', function(event) {
    const $tweetDataSerialized = $form.serialize();
    const $tweet = $("#tweet-text")[0].value;
    event.preventDefault();

    if ($("#error-message")) {
      $("#error-message").hide();
      $("#error-message").remove();
    }

    if ($tweet.length === 0) {
      $("form").before(errorMessageElement("zero"));
      $("#error-message").slideToggle();
      return;
    }
    if ($tweet.length > 140) {
      $("form").before(errorMessageElement("exceededLength"));
      $("#error-message").slideToggle();
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $tweetDataSerialized,
      success: function() {
        $("#tweet-text").val('');

        // Fetch and add the latest tweet to the page
        $.ajax({
          method: "GET",
          url: "/tweets",
          success: function(res) {
            const latestTweet = res[0];
            const $formattedTweetData = createTweetElement(latestTweet);
            $('#tweets-container').prepend($formattedTweetData);
          }
        });
      }
    });
  });
});
