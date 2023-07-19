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
    const $tweetData = `
            <article class="tweet">
              <header>
                  <div class="tweet-header-left-side">
                    <span class="user-icon">
                    <i class="fa-solid fa-user-astronaut"></i>
                    </span>
                    <span class="user-full-name">${tweet["user"]["name"]}</span>
                  </div>
                  <div class="tweet-header-right-side">
                    <span class="user-handle">${tweet["user"]["handle"]}</span>
                  </div>
              </header>
              <p>${tweet["content"]["text"]}</p>
              <hr>
              <footer>
                  <div>
                    <span class="tweet-duration">${tweet["created_at"]}</span>
                  </div>
                  <div class="tweet-footer-right-side">
                    <span class="flag-icon"><i class="fa-regular fa-flag"></i></span>
                    <span class="retweet-icon"><i class="fa-solid fa-retweet"></i></span>
                    <span class="heart-icon"><i class="fa-regular fa-heart"></i></span>
                  </div>
              </footer>
            </article>
            `;
    return $tweetData;
  };

  renderTweets(data);

});