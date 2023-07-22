/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
{

  $(document).ready(function() {

    //render all tweets from the db. uses createTweetElement to create each tweet out of db
    const renderTweets = function(tweets) {
      for (const tweet of tweets) {
        const $formattedTweetData = createTweetElement(tweet);
        $('#tweets-container').append($formattedTweetData);
      }
    };

    //creates a new tweet
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
      const $flag = $('<i>').addClass('fa-solid fa-flag');
      const $retweet = $('<i>').addClass('fa-solid fa-circle');
      const $heart = $('<i>').addClass('fa-solid fa-heart');

      $footerRightSideDiv.append($flag, $retweet, $heart);
      $footer.append($duration, $footerRightSideDiv);

      $article.append($tweetHeader, $content, $hr, $footer);

      return $article;
    };

    //sanitizes tweet content to text to prevent XSS injection
    function sanitize(text) {
      const element = document.createTextNode(text);
      const div = document.createElement('div');
      div.appendChild(element);
      return div.innerHTML;
    }

    const loadTweets = function() {
      $.get("/tweets")
        .then(renderTweets)
        .catch(error => console.log('Error details: ' + error));
    };

    const $form = $('form');
    $form.on('submit', function(event) {
      event.preventDefault();

      const $error = $("#error");
      const $tweetDataSerialized = $form.serialize();
      const $tweet = $("#tweet-text")[0].value;

      $error.removeClass().addClass("error");

      if ($tweet.length === 0) {
        $error.removeClass("error").addClass("error-show");
        $error.html("Don't be shy. Use your words.");
        return;
      }
      if ($tweet.length > 140) {
        $error.removeClass("error").addClass("error-show");
        $error.html("Use less words. Less than 140.");
        return;
      }

      $.post('/tweets', $tweetDataSerialized)
        .then(() => {
          $("#tweet-text").val('');
          $("#counter").val('140');

          $.get('/tweets')
            .then((res) => {
              $("#tweets-container").prepend(createTweetElement(res[res.length - 1]));
            })
            .catch((err) => console.log('Error: ' + err));
        })
        .catch((err) => console.log('Error: ' + err));
    });

    loadTweets();
  });

}