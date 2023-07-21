/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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

    const $tweetHeader = $('<div>').addClass('tweet-header').attr('id', "tweet-header");
    const $leftSideOfHeader = $('<div>').addClass('tweet-header-left');

    const $avatar = $('<img>').attr('src', sanitize(avatar));
    const $fullName = $('<span>').text(sanitize(name));
    $leftSideOfHeader.append($avatar, $fullName);
    const $handle = $('<span>').attr('id', "user-handle").text(sanitize(handle));
    $tweetHeader.append($leftSideOfHeader, $handle);


    const $content = $('<p>').text(sanitize(content.text));
    const $hr = $('<hr>');

    const $footer = $('<footer>');
    const $duration = $('<span>').text(sanitize(timePassed));


    const $footerRightSideDiv = $('<div>');

    const $flag = $('<i>').addClass('fa-regular fa-flag');
    const $retweet = $('<i>').addClass('fa-regular fa-circle');
    const $heart = $('<i>').addClass('fa-regular fa-heart');

    $footerRightSideDiv.append($flag, $retweet, $heart);
    $footer.append($duration, $footerRightSideDiv);

    $article.append($tweetHeader, $content, $hr, $footer);

    return $article;
  };

  function sanitize(text) {
    const element = document.createTextNode(text);
    const div = document.createElement('div');
    div.appendChild(element);
    return div.innerHTML;
  }


  const errorMessageElement = function(errorType) {
    const errorMessages = {
      zero: "Don't be shy. Use your words.",
      exceededLength: "Uh oh!!! Tweet length exceeds 140 characters. Buy \"tweeter pro\" to enter more."
    };
    return $('<h3>').attr('id', 'error-message').text(errorMessages[errorType]);
  };


  const loadTweets = function() {
    $.get("/tweets")
      .then(renderTweets)
      .catch(error => console.log('Error details: ' + error));
  };
  loadTweets();


  const $form = $('form');
  $form.on('submit', function(event) {
    const $tweetDataSerialized = $form.serialize();
    const $tweet = $("#tweet-text")[0].value;
    event.preventDefault();

    if ($("#error-message")) {
      $("#error-message").hide().remove();
      // $("#error-message").remove();
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

    $.post('/tweets', $tweetDataSerialized)
      .then(() => {
        $("#tweet-text").val('');

        $.get('/tweets')
          .then((res) => {
            $("#tweets-container").prepend(createTweetElement(res[0]))
          })
          .catch((err) => console.log('Error: ' + err));
      })
      .catch((err) => console.log('Error: ' + err));
  });
});
